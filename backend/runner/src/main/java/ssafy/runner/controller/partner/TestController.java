package ssafy.runner.controller.partner;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public String sayHello() {
        return "hello";
    }
}
