package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.partner.OrderResponseDto;
import ssafy.runner.domain.dto.partner.OrderUpdateRequestDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.OrderService;
import ssafy.runner.util.CustomPrincipal;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@Api(tags = "Partner주문관리 API")
@RequiredArgsConstructor
@RequestMapping("/api/partner")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/orders")
    @ApiOperation(value = "Test용 주문내역 전체조회")
    public ResponseEntity<List<OrderResponseDto>> orderList(Authentication authentication) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.CUSTOMER.toString())) throw new IllegalStateException("점주만 조회가능합니다.");
        List<OrderResponseDto> orderList = orderService.findAll(principal.getEmail());
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }

    @GetMapping("/shop/orders")
    @ApiOperation(value = "전체 주문내역 조회")
    public ResponseEntity<List<OrderResponseDto>> all(Authentication authentication) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.CUSTOMER.toString())) throw new IllegalStateException("점주만 조회가능합니다.");
        List<OrderResponseDto> orderList = orderService.findByShop(principal.getEmail());
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }

    @GetMapping("/shop/orders/today")
    @ApiOperation(value = "당일 주문내역 조회")
    public ResponseEntity<List<OrderResponseDto>> todayOrderList(Authentication authentication) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.CUSTOMER.toString())) throw new IllegalStateException("점주만 조회가능합니다.");
        List<OrderResponseDto> orderList = orderService.findByShopAndDay(principal.getEmail(), LocalDateTime.now());
        log.info(String.valueOf(LocalDateTime.now()));
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }

    @GetMapping("/shop/orders/today/status/{status}")
    @ApiOperation(value = "당일 상태별 주문내역 조회")
    public ResponseEntity<List<OrderResponseDto>> todayOrderListByStatus(Authentication authentication, @PathVariable("status") String status) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.CUSTOMER.toString())) throw new IllegalStateException("점주만 조회가능합니다.");
        List<OrderResponseDto> orderList = orderService.findByShopAndDayAndStatus(principal.getEmail(), LocalDateTime.now(), status);
        log.info(String.valueOf(LocalDateTime.now()));
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }

    @PatchMapping("/shop/orders/{orderId}/status")
    @ApiOperation(value = "주문상태 변경")
    public ResponseEntity<OrderResponseDto> changeOrderStatus(Authentication authentication,
                                                              @PathVariable Long orderId,
                                                              @RequestBody OrderUpdateRequestDto orderUpdateRequestDto) {

        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.CUSTOMER.toString())) throw new IllegalStateException("점주만 조회가능합니다.");
        OrderResponseDto order = orderService.modifyStatus(orderId, orderUpdateRequestDto);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
