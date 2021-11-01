package ssafy.runner.controller.customer;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.runner.domain.dto.customer.ShopAndMenuResponseDto;
import ssafy.runner.domain.dto.menu.MenuNSizeNExtraResponseDto;
import ssafy.runner.service.MenuService;
import ssafy.runner.service.ShopService;

@RestController
@RequiredArgsConstructor
@Api(tags = {"Customer 카페 상세 조회"})
@RequestMapping("/api/customer/cafes")
public class CustomerShopController {

    private final ShopService shopService;
    private final MenuService menuService;

    @GetMapping("/{shopId}")
    @ApiOperation(value = "가게 정보 및 메뉴리스트 조회")
    public ShopAndMenuResponseDto getShopAndMenu(@PathVariable("shopId") Long shopId) {

        return shopService.getShopAndMenu(shopId);
    }

    @GetMapping("/{shopId}/menu/{menuId}")
    @ApiOperation(value = "단일 메뉴 상세 조회")   // @PathVariable을 사용하려고 했으나 @Param을 사용하라는 오류 발생
    public MenuNSizeNExtraResponseDto getMenuDetail(@PathVariable("shopId") Long shopId, @PathVariable("menuId") Long menuId) {

        return menuService.getMenuDetail(shopId, menuId);
    }

}
