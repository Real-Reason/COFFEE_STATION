package ssafy.runner.controller.customer;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.runner.service.ShopService;

@RestController
@RequiredArgsConstructor
@Api(tags = {"Customer 카페 상세 조회"})
@RequestMapping("/api/customer/cafes")
public class CustomerShopController {

    private final ShopService shopService;

    @GetMapping("/{shopId}")
    @ApiOperation(value = "가게 정보 및 메뉴리스트 조회")
    public Object getShopAndMenu(@PathVariable("shopId") Long shopId) {

        Object shopAndMenu = shopService.getShopAndMenu(shopId);
        return shopAndMenu;
    }

}
