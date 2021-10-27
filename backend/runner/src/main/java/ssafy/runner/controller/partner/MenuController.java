package ssafy.runner.controller.partner;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.runner.domain.dto.ShopReqDto;
import ssafy.runner.domain.dto.partner.MenuCreateRequestDto;
import ssafy.runner.domain.dto.partner.MenuCreateResponseDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.MenuService;
import ssafy.runner.util.CustomPrincipal;

@RestController
@Api(tags = {"메뉴 관련 API"})
@RequiredArgsConstructor
@RequestMapping("/api/partner/menu")
public class MenuController {

    private final MenuService menuService;

    @PostMapping("")
    @ApiOperation(value = "메뉴 생성")
    public MenuCreateResponseDto createMenu(Authentication authentication, @RequestBody MenuCreateRequestDto requestDto) {
        CustomPrincipal principal = (CustomPrincipal) authentication.getPrincipal();
        if (principal.getRole().equals(UserType.CUSTOMER.toString())) throw new RuntimeException("점주가 아니면 메뉴를 생성할 수 없습니다.");
        return menuService.createMenu(principal.getEmail(), requestDto.getCategoryId(), requestDto.getPrice(), requestDto.getImgUrl(), requestDto.isSignature());
    }
}
