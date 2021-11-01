package ssafy.runner.controller.customer;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.CustomerMenuService;
import ssafy.runner.service.CustomerShopService;
import org.springframework.security.core.Authentication;
import ssafy.runner.util.CustomPrincipal;

@RestController
@RequiredArgsConstructor
@Api(tags = {"Customer 좋아요"})
@RequestMapping("/api/customer/favorites")
public class CustomerLikeController {

    private final CustomerShopService customerShopService;
    private final CustomerMenuService customerMenuService;

    @PostMapping("/shop/{shopId}")
    @ApiOperation(value = "가게 즐겨찾기 등록")
    public ResponseEntity likeShop(Authentication authentication, @PathVariable("shopId") Long shopId) {

        String email = checkPrincipalReturnEmail(authentication);
        System.out.println("email = " + email);
        customerShopService.likeShop(shopId, email);

        return new ResponseEntity<>("가게 좋아요 등록 성공", HttpStatus.CREATED);
    }

    @PostMapping("/menu/{menuId}")
    @ApiOperation(value = "메뉴 즐겨찾기 등록")
    public ResponseEntity likeMenu(Authentication authentication,
                                   @PathVariable("menuId") Long menuId) {

        String email = checkPrincipalReturnEmail(authentication);
        customerMenuService.likeMenu(menuId, email);

        return new ResponseEntity<>("메뉴 좋아요 등록 성공", HttpStatus.CREATED);
    }




    // 점주 계정인지 확인 한후, 점주가 맞으면 email 리턴
    private String checkPrincipalReturnEmail(Authentication authentication) {

        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.PARTNER.toString()))
            throw new IllegalStateException("사용자만 조회가능합니다.");
        return principal.getEmail();
    }

}
