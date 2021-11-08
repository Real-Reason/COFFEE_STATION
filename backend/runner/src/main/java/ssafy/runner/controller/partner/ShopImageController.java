package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.runner.domain.dto.shop.ShopImageResponseDto;
import ssafy.runner.service.ShopImageService;

import java.io.IOException;
import java.util.List;

@RestController
@Api(tags = {"Shop Image API"})
@RequiredArgsConstructor
@RequestMapping("/api/partner")
public class ShopImageController {

    private final ShopImageService shopImageService;

    @PostMapping("/shop/{shopId}/images")
    @ApiOperation(value = "샵 이미지 등록하기")
    public List<ShopImageResponseDto> uploadShopImages(@PathVariable("shopId") Long shopId, @RequestParam("images") List<MultipartFile> multipartFile) throws IOException {

        List<ShopImageResponseDto> shopImageResponseDto = shopImageService.uploadShopImages(shopId, multipartFile);
        return shopImageResponseDto;
    }
}
