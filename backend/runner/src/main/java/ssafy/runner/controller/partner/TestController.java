package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = {"테스트용 API"})
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("")
    @ApiOperation(value = "테스트")
    public String sayHello() {
        return "hello";
    }
}
