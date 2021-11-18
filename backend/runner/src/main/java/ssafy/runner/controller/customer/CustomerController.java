package ssafy.runner.controller.customer;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.FirebaseTokenSaveRequestDto;
import ssafy.runner.domain.dto.LoginCustomerResponseDto;
import ssafy.runner.domain.dto.customer.CustomerJoinRequestDto;
import ssafy.runner.domain.dto.customer.CustomerJoinResponseDto;
import ssafy.runner.domain.dto.LoginRequestDto;
import ssafy.runner.domain.dto.LoginPartnerResponseDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.CustomerService;
import ssafy.runner.util.CustomPrincipal;
import ssafy.runner.util.JwtUtil;


@RestController
@RequiredArgsConstructor
@Api(tags = {"Customer관련 API"})
@RequestMapping("/api/customer")
public class CustomerController {

    private final JwtUtil jwtUtil;
    private final CustomerService customerService;

    @PostMapping("/join")
    @ApiOperation(value = "유저 회원가입")
    public CustomerJoinResponseDto join(@RequestBody CustomerJoinRequestDto requestDto) {
        if (!requestDto.getPassword().equals(requestDto.getPasswordConfirm())) throw new RuntimeException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return customerService.join(requestDto.getEmail(), requestDto.getPassword(), requestDto.getNickname());
    }

    @PostMapping("/login")
    @ApiOperation(value = "유저 로그인")
    public LoginCustomerResponseDto login(@RequestBody LoginRequestDto requestDto) {
        String token = jwtUtil.createToken(requestDto.getEmail(), requestDto.getPassword(), UserType.CUSTOMER);
        String nickname = customerService.findNickname(requestDto.getEmail());
        return new LoginCustomerResponseDto(nickname, token);
    }

    // token 접근 테스트 용도
    @GetMapping("/innerpage")
    @ApiOperation(value = "유저 내부페이지 토큰 테스트")
    public String login(Authentication authentication) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        System.out.println(principal.getEmail());
        System.out.println(principal.getRole());
        return "success";
    }

    @PatchMapping("/firebase-token")
    @ApiOperation("파이어베이스 토큰 저장 요청")
    public ResponseEntity<String> registerFirebase(Authentication authentication,
                                                   @RequestBody FirebaseTokenSaveRequestDto firebaseTokenSaveRequestDto) {
        System.out.println("firebaseTokenSaveRequestDto ======== " + firebaseTokenSaveRequestDto.getFirebaseToken());
        String email = ((CustomPrincipal) authentication.getPrincipal()).getEmail();
        if (customerService.saveOrUpdateFirebaseToken(email, firebaseTokenSaveRequestDto)) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else return new ResponseEntity<>("failed", HttpStatus.BAD_REQUEST);
    }
}
