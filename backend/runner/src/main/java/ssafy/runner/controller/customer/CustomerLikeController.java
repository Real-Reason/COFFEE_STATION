package ssafy.runner.controller.customer;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.customer.Like.LikeMenuListResponseDto;
import ssafy.runner.domain.dto.customer.Like.LikeMenuResponseDto;
import ssafy.runner.domain.dto.customer.Like.LikeShopListResponseDto;
import ssafy.runner.domain.dto.customer.Like.LikeShopResponseDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.CustomerMenuService;
import ssafy.runner.service.CustomerShopService;
import org.springframework.security.core.Authentication;
import ssafy.runner.util.CustomPrincipal;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(tags = {"Customer 좋아요"})
@RequestMapping("/api/customer/favorites")
public class CustomerLikeController {

    private final CustomerShopService customerShopService;
    private final CustomerMenuService customerMenuService;

    @PostMapping("/shop/{shopId}")
    @ApiOperation(value = "가게 즐겨찾기 등록")
    public ResponseEntity<LikeShopResponseDto> likeShop(Authentication authentication, @PathVariable("shopId") Long shopId) {

        String email = checkPrincipalReturnEmail(authentication);
        System.out.println("email = " + email);
        LikeShopResponseDto likeShopResponseDto = customerShopService.likeShop(shopId, email);

        return new ResponseEntity<>(likeShopResponseDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/shop/{shopId}")
    @ApiOperation(value = "가게 즐겨찾기 취소")
    public ResponseEntity<Long> unLikeShop(Authentication authentication, @PathVariable("shopId") Long shopId) {

        String email = checkPrincipalReturnEmail(authentication);
        System.out.println("email = " + email);
        customerShopService.unLikeShop(shopId, email);

        return new ResponseEntity<>(shopId, HttpStatus.CREATED);
    }

    @PostMapping("/menu/{menuId}")
    @ApiOperation(value = "메뉴 즐겨찾기 등록")
    public ResponseEntity<LikeMenuResponseDto> likeMenu(Authentication authentication,
                                                        @PathVariable("menuId") Long menuId) {

        String email = checkPrincipalReturnEmail(authentication);
        LikeMenuResponseDto likeMenuResponseDto = customerMenuService.likeMenu(menuId, email);

        return new ResponseEntity<>(likeMenuResponseDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/menu/{menuId}")
    @ApiOperation(value = "메뉴 즐겨찾기 취소")
    public ResponseEntity<Long> unLikeMenu(Authentication authentication,
                                   @PathVariable("menuId") Long menuId) {

        String email = checkPrincipalReturnEmail(authentication);
        customerMenuService.unLikeMenu(menuId, email);

        return new ResponseEntity<>(menuId, HttpStatus.CREATED);
    }


    @GetMapping("/shop")
    @ApiOperation(value = "좋아요한 가게 목록 조회")
    public LikeShopListResponseDto getLikeShopList(Authentication authentication) {

        String email = checkPrincipalReturnEmail(authentication);
        LikeShopListResponseDto likeShopList = customerShopService.getLikeShopList(email);

        return likeShopList;
    }

    @GetMapping("/menu")
    @ApiOperation(value = "좋아요한 메뉴 목록 조회")
    public LikeMenuListResponseDto getLikeMenuList(Authentication authentication) {

        String email = checkPrincipalReturnEmail(authentication);
        LikeMenuListResponseDto likeMenuList = customerMenuService.getLikeMenuList(email);

        return likeMenuList;
    }


    // 사용자 계정인지 확인 한후, 사용자가 맞으면 email 리턴
    private String checkPrincipalReturnEmail(Authentication authentication) {

        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.PARTNER.toString()))
            throw new IllegalStateException("사용자만 조회가능합니다.");
        return principal.getEmail();
    }
}
