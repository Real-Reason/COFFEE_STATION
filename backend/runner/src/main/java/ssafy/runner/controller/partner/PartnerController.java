package ssafy.runner.controller.partner;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.partner.PartnerJoinRequestDto;
import ssafy.runner.domain.dto.partner.PartnerJoinResponseDto;
import ssafy.runner.domain.dto.partner.PartnerLoginRequestDto;
import ssafy.runner.domain.dto.partner.PartnerLoginResponseDto;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.PartnerService;
import ssafy.runner.util.JwtUtil;

import ssafy.runner.domain.dto.partner.PartnerDto;
import ssafy.runner.domain.dto.ShopReqDto;
import ssafy.runner.domain.dto.ShopResDto;
import ssafy.runner.service.PartnerService;
import ssafy.runner.service.ShopService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/partner")
public class PartnerController {

    private final PartnerService partnerService;
    private final JwtUtil jwtUtil;
    private final ShopService shopService;


    @PostMapping("/join")
    public PartnerJoinResponseDto join(@RequestBody PartnerJoinRequestDto requestDto) {
        if (!requestDto.getPassword().equals(requestDto.getPasswordConfirm())) throw new RuntimeException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return partnerService.join(requestDto.getEmail(), requestDto.getPassword());
    }

    @PostMapping("/login")
    public PartnerLoginResponseDto login(@RequestBody PartnerLoginRequestDto requestDto) {
        String token = jwtUtil.createToken(requestDto.getEmail(), requestDto.getPassword(), UserType.PARTNER);
        return new PartnerLoginResponseDto(token);
    }

    // token 접근 테스트 용도
    @GetMapping("/innerpage")
    public String login(Authentication authentication) {
        String principal = (String) authentication.getPrincipal();
        System.out.println(principal);
        return "success";
    }

    // 가게 생성
    @PostMapping("/store")
    public Long createStore(@RequestBody ShopReqDto params) {
        Long partnerId = 1L;  // 원래는 토큰에서 정보 얻어서 넣을 값 (임시 값)

        Long shopId = shopService.save(params, partnerId);
        return shopId;
    }

    // 가게 상세 조회
    @GetMapping("/store")
    public ShopResDto getShopDetail() {
        Long shopId = 1L;  // 원래는 토큰에서 정보 얻어서 넣을 값 (임시 값)
        ShopResDto shopDetail = shopService.getShopDetail(shopId);

        return shopDetail;
    }
}
