package ssafy.runner.controller.customer;


import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(tags = {"Customer order관련 API"})
@RequestMapping("/api/customer")
public class CustomerOrderController {
}
