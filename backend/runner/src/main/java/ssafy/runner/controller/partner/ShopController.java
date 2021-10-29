package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.shop.ShopReqDto;
import ssafy.runner.domain.dto.shop.ShopResDto;
import ssafy.runner.domain.dto.shop.CategoryResponseDto;
import ssafy.runner.service.CategoryService;
import ssafy.runner.service.ShopService;

import java.util.HashMap;
import java.util.List;

@RestController
@Api(tags = {"Shop관련 API"})
@RequiredArgsConstructor
@RequestMapping("/api/partner")
public class ShopController {

    private final ShopService shopService;
    private final CategoryService categoryService;


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
    public ResponseEntity changeShopStatus(@RequestBody HashMap<String, String> status) {
        Long shopId = 1L; // 원래는 토큰에서 정보 얻어서 넣을 값 (임시 값)
        shopService.changeShopStatus(status.get("status").toString(), shopId);

        return new ResponseEntity<>("영업상태 변경 성공", HttpStatus.OK);
    }

    // 카테고리 리스트 조회
    @GetMapping("/shop/categories")
    public List<CategoryResponseDto> getCategoryList() {
        List<CategoryResponseDto> categoryList = categoryService.getCategoryList();
        return categoryList;
    }
}
