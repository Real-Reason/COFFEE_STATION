package ssafy.runner.controller.customer;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.customer.CustomerOrderResponseDto;
import ssafy.runner.domain.dto.customer.order.detail.OrderDetailResDto;
import ssafy.runner.domain.dto.order.OrderRequestDto;
import ssafy.runner.domain.dto.order.OrderResponseDto;
import ssafy.runner.domain.dto.order.OrderUpdateRequestDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.CustomerOrderService;
import ssafy.runner.service.PartnerOrderService;
import ssafy.runner.util.CustomPrincipal;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(tags = {"Customer order관련 API"})
@RequestMapping("/api/customer")
public class CustomerOrderController {

    private final CustomerOrderService customerOrderService;
    private final PartnerOrderService partnerOrderService;

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

    @GetMapping("/orders/{orderId}/paid")
    @ApiOperation(value = "주문 결제 완료, 주문상태 변경 및 fcm 알림전송")
    public ResponseEntity<String> orderPayCompleted(@PathVariable("orderId") Long orderId) throws IOException {

        partnerOrderService.modifyStatus(orderId, new OrderUpdateRequestDto("PAID"));
        customerOrderService.paidFcm(orderId); // Partner 쪽으로 메시지 보내느 것!! Customer로 확인하지마....

        return new ResponseEntity<>("주문 결제 완료", HttpStatus.OK);
    }

}
