package ssafy.runner.controller.customer;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.customer.CustomerJoinRequestDto;
import ssafy.runner.domain.dto.customer.CustomerJoinResponseDto;
import ssafy.runner.domain.dto.LoginRequestDto;
import ssafy.runner.domain.dto.LoginResponseDto;
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
    public LoginResponseDto login(@RequestBody LoginRequestDto requestDto) {
        String token = jwtUtil.createToken(requestDto.getEmail(), requestDto.getPassword(), UserType.CUSTOMER);
        return new LoginResponseDto(token);
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
}
