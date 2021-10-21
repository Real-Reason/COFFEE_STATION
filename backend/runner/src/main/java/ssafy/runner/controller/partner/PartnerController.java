package controller.partner;

import domain.entity.Partner;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.PartnerService;

@RestController
@RequestMapping("/partner")
public class PartnerController {

    private final PartnerService partnerService;

    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    // 테스트용 partner DB 입력
    @PostMapping("/join")
    public Object join(@RequestBody Object params) {
        return partnerService.join(params);
    }
}
