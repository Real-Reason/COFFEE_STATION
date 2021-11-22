package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.FirebaseTokenSaveRequestDto;
import ssafy.runner.domain.dto.partner.PartnerJoinRequestDto;
import ssafy.runner.domain.dto.partner.PartnerJoinResponseDto;
import ssafy.runner.domain.dto.LoginRequestDto;
import ssafy.runner.domain.dto.LoginPartnerResponseDto;
import ssafy.runner.domain.dto.partner.PartnerValiReqDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.PartnerService;
import ssafy.runner.util.CustomPrincipal;
import ssafy.runner.util.JwtUtil;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.util.ArrayList;

@RestController
@Api(tags = {"Partner관련 API"})
@RequiredArgsConstructor
@RequestMapping("/api/partner")
public class PartnerController {

    private final JwtUtil jwtUtil;
    private final PartnerService partnerService;

    @PostMapping("/join")
    @ApiOperation(value = "파트너 회원가입")
    public PartnerJoinResponseDto join(@RequestBody PartnerJoinRequestDto requestDto) {
        if (!requestDto.getPassword().equals(requestDto.getPasswordConfirm()))
            throw new RuntimeException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return partnerService.join(requestDto.getEmail(), requestDto.getPassword());
    }

    @PostMapping("/login")
    @ApiOperation(value = "파트너 로그인")
    public LoginPartnerResponseDto login(@RequestBody LoginRequestDto requestDto) {
        String token = jwtUtil.createToken(requestDto.getEmail(), requestDto.getPassword(), UserType.PARTNER);
        // 가게 등록 여부에 대해서 받아오기
        Boolean registerShop = partnerService.registerShop(requestDto.getEmail());
        return new LoginPartnerResponseDto(token, registerShop);
    }

    // token 접근 테스트 용도
    @GetMapping("/innerpage")
    @ApiOperation(value = "파트너 내부페이지 토큰 테스트")
    public String login(Authentication authentication) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        System.out.println(principal.getEmail());
        System.out.println(principal.getRole());
        return "success";
    }

    @PostMapping("/validation")
    @ApiOperation(value = "파트너 사업자 인증 여부")
    public ResponseEntity validatePartner(@RequestBody PartnerValiReqDto params) throws Exception{

        String host = "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=";
        String serviceKey = "hoxrqCIRhMCanug8aBYzxn%2BQjqLI3d8t0DHqIFHfZoLT7Jh%2BDVg01jEVBo6X%2FYSu3lveUiCX0sMUuXYQUToDOA%3D%3D";

        ArrayList<String> objects = new ArrayList<>();
        objects.add(params.getB_no());

        JSONObject requestBody = new JSONObject();
        requestBody.put("b_no", objects);

        URL url = new URL(host + serviceKey);
        HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));

        bw.write(requestBody.toJSONString());
        bw.flush();
        bw.close();

        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String response = in.readLine();

        JSONParser jsonParser = new JSONParser();
        Object responseObject = jsonParser.parse(response);
        JSONObject responseToJson = (JSONObject) responseObject;

        JSONArray dataArray = (JSONArray) responseToJson.get("data");
        JSONObject dataJson = (JSONObject) dataArray.get(0);
        String b_stt = (String) dataJson.get("b_stt");

        if (b_stt.equals("계속사업자")) {
            return new ResponseEntity<>(b_stt, HttpStatus.OK);
        }
        else {
            throw new RuntimeException("계속사업자가 아닙니다.");
        }
    }
    @PatchMapping("/firebase-token")
    @ApiOperation("파이어베이스 토큰 저장 요청")
    public ResponseEntity<String> registerFirebase(Authentication authentication,
                                                   @RequestBody FirebaseTokenSaveRequestDto firebaseTokenSaveRequestDto) {
        String email = ((CustomPrincipal) authentication.getPrincipal()).getEmail();
        if (partnerService.saveOrUpdateFirebaseToken(email, firebaseTokenSaveRequestDto)) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
    }
}
