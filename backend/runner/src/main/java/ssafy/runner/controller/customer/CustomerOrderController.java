package ssafy.runner.controller.customer;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.runner.domain.dto.customer.CustomerOrderResponseDto;
import ssafy.runner.domain.dto.customer.order.detail.OrderDetailResDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.CustomerOrderService;
import ssafy.runner.util.CustomPrincipal;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(tags = {"Customer order관련 API"})
@RequestMapping("/api/customer")
public class CustomerOrderController {

    private final CustomerOrderService customerOrderService;

    private String checkPrincipalReturnEmail(Authentication authentication) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.PARTNER.toString()))
            throw new IllegalStateException("고객만 조회가능합니다.");
        return principal.getEmail();
    }

    @GetMapping("/orders")
    @ApiOperation(value = "주문 전체 내역 조회")
    public List<CustomerOrderResponseDto> findOrders(Authentication authentication) {
        String email = checkPrincipalReturnEmail(authentication);
        return customerOrderService.findCustomerOrders(email);
    }

    @GetMapping("/orders/{orderId}")
    @ApiOperation(value = "주문 상세 내역 조회")
    public OrderDetailResDto findOneOrder(Authentication authentication, @PathVariable("orderId") Long orderId) {
        String email = checkPrincipalReturnEmail(authentication);
        return customerOrderService.findOneOrder(email, orderId);
    }
}
