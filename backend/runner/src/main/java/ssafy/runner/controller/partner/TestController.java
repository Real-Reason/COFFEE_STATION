package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.runner.util.JwtUtil;

@RestController
@Api(tags = {"테스트용 API"})
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final JwtUtil jwtUtil;

    @GetMapping("")
    @ApiOperation(value = "테스트")
    public String sayHello() {
        return "hello";
    }
    @GetMapping("/login")
    @ApiOperation(value = "테스트")
    public String login() {
        String token = jwtUtil.createToken("JYK");
        return token;
    }
    @GetMapping("/innerpage")
    @ApiOperation(value = "테스트")
    public String innerPage() {
        return "hello";
    }
}
