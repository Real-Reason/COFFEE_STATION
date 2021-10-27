package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.partner.PartnerJoinRequestDto;
import ssafy.runner.domain.dto.partner.PartnerJoinResponseDto;
import ssafy.runner.domain.dto.LoginRequestDto;
import ssafy.runner.domain.dto.LoginResponseDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.PartnerService;
import ssafy.runner.util.CustomPrincipal;
import ssafy.runner.util.JwtUtil;

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
        if (!requestDto.getPassword().equals(requestDto.getPasswordConfirm())) throw new RuntimeException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return partnerService.join(requestDto.getEmail(), requestDto.getPassword());
    }

    @PostMapping("/login")
    @ApiOperation(value = "파트너 로그인")
    public LoginResponseDto login(@RequestBody LoginRequestDto requestDto) {
        String token = jwtUtil.createToken(requestDto.getEmail(), requestDto.getPassword(), UserType.PARTNER);
        return new LoginResponseDto(token);
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

}
