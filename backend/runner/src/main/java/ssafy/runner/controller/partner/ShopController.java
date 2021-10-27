package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.ShopReqDto;
import ssafy.runner.domain.dto.ShopResDto;
import ssafy.runner.service.ShopService;

@RestController
@Api(tags = {"Shop관련 API"})
@RequiredArgsConstructor
@RequestMapping("/api/partner")
public class ShopController {

    private final ShopService shopService;


    // 가게 생성
    @PostMapping("/shop")
    @ApiOperation(value = "샵 생성")
    public Long createShop(@RequestBody ShopReqDto params) {
        Long partnerId = 1L;  // 원래는 토큰에서 정보 얻어서 넣을 값 (임시 값)
        Long shopId = shopService.save(params, partnerId);
        return shopId;
    }

    // 가게 상세 조회
    @GetMapping("/shop")
    @ApiOperation(value = "샵 상세조회")
    public ShopResDto getShopDetail() {
        Long shopId = 1L;  // 원래는 토큰에서 정보 얻어서 넣을 값 (임시 값)
        ShopResDto shopDetail = shopService.getShopDetail(shopId);
        return shopDetail;
    }

    // 영업 상태 변경
    @PatchMapping("/shop/status")
    @ApiOperation(value = "영업 상태변경")
    public void changeShopStatus() {

    }

}
