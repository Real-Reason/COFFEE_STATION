package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.order.OrderMenuRevResponseDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.OrderMenuService;
import ssafy.runner.util.CustomPrincipal;

import java.time.LocalDateTime;

@Slf4j
@RestController
@Api(tags = "Partner주문관리 API")
@RequiredArgsConstructor
@RequestMapping("/api/partner")
public class OrderMenuController {

    private final OrderMenuService orderMenuService;
    @GetMapping("/shop/orders/revenue/menu/{menuId}")
    @ApiOperation(value = "메뉴별 매출 조회")
    public ResponseEntity<Integer> weekRevenue(Authentication authentication,
                                               @PathVariable Long menuId) {

        String email = checkPrincipalReturnEmail(authentication);
        int totalRevenue = orderMenuService.findRevByMenu(email, menuId);
        return new ResponseEntity<>(totalRevenue, HttpStatus.OK);
    }


    // 점주 계정인지 확인 한후, 점주가 맞으면 email 리턴
    private String checkPrincipalReturnEmail(Authentication authentication) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.CUSTOMER.toString()))
            throw new IllegalStateException("점주만 조회가능합니다.");
        return principal.getEmail();
    }
}
