package ssafy.runner.controller.customer;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.customer.CustomerOrderResponseDto;
import ssafy.runner.domain.dto.customer.order.detail.OrderDetailResDto;
import ssafy.runner.domain.dto.order.OrderRequestDto;
import ssafy.runner.domain.dto.order.OrderResponseDto;
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
        return customerOrderService.findOrdersByCustomer(email);
    }

    @GetMapping("/orders/{orderId}")
    @ApiOperation(value = "주문 상세 내역 조회")
    public OrderDetailResDto findOneOrder(Authentication authentication, @PathVariable("orderId") Long orderId) {
        String email = checkPrincipalReturnEmail(authentication);
        return customerOrderService.findOneOrder(email, orderId);
    }

    @PostMapping("/shop/{shopId}/order")
    @ApiOperation(value = "주문하기")
    public OrderResponseDto orderProducts(Authentication authentication, @PathVariable("shopId") Long shopId, @RequestBody OrderRequestDto params) {

        String email = checkPrincipalReturnEmail(authentication);
        OrderResponseDto orderResDto = customerOrderService.order(email, shopId, params);

        return orderResDto;
    }

}
