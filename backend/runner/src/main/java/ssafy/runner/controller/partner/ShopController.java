package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.io.ParseException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.runner.domain.dto.shop.ShopBriefResponseDto;
import ssafy.runner.domain.dto.shop.ShopReqDto;
import ssafy.runner.domain.dto.shop.ShopResDto;
import ssafy.runner.domain.dto.shop.CategoryResponseDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.CategoryService;
import ssafy.runner.service.S3Uploader;
import ssafy.runner.service.ShopService;
import ssafy.runner.util.CustomPrincipal;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@Api(tags = {"Shop관련 API"})
@RequiredArgsConstructor
@RequestMapping("/api/partner")
public class ShopController {

    private final ShopService shopService;
    private final CategoryService categoryService;
    private final S3Uploader s3Uploader;

    // 가게 생성
    @PostMapping("/shop")
    @ApiOperation(value = "샵 생성")
    public ResponseEntity<String> createShop(Authentication authentication, @RequestBody ShopReqDto params) throws IOException, ParseException {

        String email = checkPrincipalReturnEmail(authentication);
        shopService.save(params, email);
        return new ResponseEntity<>("가게 등록 성공", HttpStatus.CREATED);
    }

    // 가게 상세 조회
    @GetMapping("/shop")
    @ApiOperation(value = "샵 상세조회")
    public ShopResDto getShopDetail(Authentication authentication) {

        String email = checkPrincipalReturnEmail(authentication);
        return shopService.getShopDetail(email);
    }

    // 영업 상태 변경
    @PatchMapping("/shop/status")
    @ApiOperation(value = "영업 상태변경")
    public ResponseEntity<String> changeShopStatus(Authentication authentication, @RequestBody HashMap<String, String> status) {

        String email = checkPrincipalReturnEmail(authentication);
        shopService.changeShopStatus(status.get("status").toString(), email);
        return new ResponseEntity<>("영업상태 변경 성공", HttpStatus.OK);
    }

    // 카테고리 리스트 조회
    @GetMapping("/shop/categories")
    public List<CategoryResponseDto> getCategoryList() {

        return categoryService.getCategoryList();
    }

    private String checkPrincipalReturnEmail(Authentication authentication) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.CUSTOMER.toString()))
            throw new IllegalStateException("점주만 조회가능합니다.");
        return principal.getEmail();
    }

}
