package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.PartnerTokenService;
import ssafy.runner.util.JwtUtil;

@RestController
@Api(tags = {"테스트용 API"})
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final JwtUtil jwtUtil;
    private final PartnerTokenService partnerTokenService;

    @GetMapping("")
    @ApiOperation(value = "테스트")
    public String sayHello() {
        return "hello";
    }

    @GetMapping("/login")
    @ApiOperation(value = "테스트")
    public String login() {
        partnerTokenService.join("wns312@naver.com", "password");
        String token = jwtUtil.createToken("wns312@naver.com", "password", UserType.PARTNER);
        return token;
    }
    @GetMapping("/innerpage")
    @ApiOperation(value = "테스트")
    public String innerPage(Authentication authentication) {
        return (String) authentication.getPrincipal();
    }
}
