package ssafy.runner.controller.partner;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.runner.domain.dto.PartnerDto;
import ssafy.runner.domain.dto.ShopReqDto;
import ssafy.runner.service.PartnerService;
import ssafy.runner.service.ShopService;

@RestController
@RequestMapping("/partner")
public class PartnerController {

    private final PartnerService partnerService;
    private final ShopService shopService;

    public PartnerController(PartnerService partnerService, ShopService shopService) {
        this.partnerService = partnerService;
        this.shopService = shopService;
    }

    // 테스트용 partner DB 입력
    @PostMapping("/join")
    public Object join(@RequestBody PartnerDto params) {
        return partnerService.join(params);
    }

    // 가게 생성
    @PostMapping("/store")
    public Long createStore(@RequestBody ShopReqDto params) {
        Long partnerId = null;  // 원래는 토큰에서 정보 얻어서 넣을 값 (임시 값)

        Long shopId = shopService.save(params, partnerId);
        return shopId;
    }
}
