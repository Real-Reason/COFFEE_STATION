package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.order.OrderResponseDto;
import ssafy.runner.domain.dto.order.OrderUpdateRequestDto;
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
public class PartnerOrderController {

    private final OrderService orderService;

    @GetMapping("/orders")
    @ApiOperation(value = "Test용 주문내역 전체조회")
    public ResponseEntity<List<OrderResponseDto>> orderList(Authentication authentication) {

        String email = checkPrincipalReturnEmail(authentication);
        List<OrderResponseDto> orderList = orderService.findAll(email);
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }

    @GetMapping("/shop/orders")
    @ApiOperation(value = "전체 주문내역 조회")
    public ResponseEntity<List<OrderResponseDto>> all(Authentication authentication) {

        String email = checkPrincipalReturnEmail(authentication);
        List<OrderResponseDto> orderList = orderService.findByShop(email);
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }

    @GetMapping("/shop/orders/today")
    @ApiOperation(value = "당일 주문내역 조회")
    public ResponseEntity<List<OrderResponseDto>> todayOrderList(Authentication authentication) {

        String email = checkPrincipalReturnEmail(authentication);
        List<OrderResponseDto> orderList = orderService.findByShopAndDay(email, LocalDateTime.now());
        log.info(String.valueOf(LocalDateTime.now()));
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }

    @GetMapping("/shop/orders/today/status/{status}")
    @ApiOperation(value = "당일 상태별 주문내역 조회")
    public ResponseEntity<List<OrderResponseDto>> todayOrderListByStatus(Authentication authentication, @PathVariable("status") String status) {

        String email = checkPrincipalReturnEmail(authentication);
        List<OrderResponseDto> orderList = orderService.findByShopAndDayAndStatus(email, LocalDateTime.now(), status);
        log.info(String.valueOf(LocalDateTime.now()));
        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }

    @PatchMapping("/shop/orders/{orderId}/status")
    @ApiOperation(value = "주문상태 변경")
    public ResponseEntity<OrderResponseDto> changeOrderStatus(Authentication authentication,
                                                              @PathVariable Long orderId,
                                                              @RequestBody OrderUpdateRequestDto orderUpdateRequestDto) {

        checkPrincipalReturnEmail(authentication);
        OrderResponseDto order = orderService.modifyStatus(orderId, orderUpdateRequestDto);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/shop/orders/revenue/today")
    @ApiOperation(value = "오늘 매출 조회")
    public ResponseEntity<Integer> dayRevenue(Authentication authentication) {

        String email = checkPrincipalReturnEmail(authentication);
        Integer revenue = orderService.calPeriodRevenue(email, LocalDateTime.now(), LocalDateTime.now());
        return new ResponseEntity<>(revenue, HttpStatus.OK);
    }

    @GetMapping("/shop/orders/revenue/period")
    @ApiOperation(value = "기간별 매출 조회")
    public ResponseEntity<Integer> weekRevenue(Authentication authentication,
                                               @RequestParam("from") String from,
                                               @RequestParam("to") String to) {

        String email = checkPrincipalReturnEmail(authentication);
        Integer revenue = orderService.calPeriodRevenue(email, LocalDateTime.parse(from), LocalDateTime.parse(to));
        return new ResponseEntity<>(revenue, HttpStatus.OK);
    }

    // 점주 계정인지 확인 한후, 점주가 맞으면 email 리턴
    private String checkPrincipalReturnEmail(Authentication authentication) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.CUSTOMER.toString()))
            throw new IllegalStateException("점주만 조회가능합니다.");
        return principal.getEmail();
    }
}
