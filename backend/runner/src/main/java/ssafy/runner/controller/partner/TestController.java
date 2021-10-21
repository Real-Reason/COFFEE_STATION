package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = {"테스트용 API"})
public class TestController {

    @GetMapping("/test")
    @ApiOperation(value = "테스트")
    public String sayHello() {
        return "hello";
    }
}