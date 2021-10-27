package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.ShopReqDto;
import ssafy.runner.domain.dto.ShopResDto;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.repository.PartnerRepository;
import ssafy.runner.domain.repository.ShopRepository;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ShopService {

    private final ShopRepository shopRepository;
    private final PartnerRepository partnerRepository;

    @Transactional
    public Long save(ShopReqDto params, Long partnerId) {
        Optional<Partner> optional = partnerRepository.findById(partnerId);
        if (optional.isEmpty()) throw new RuntimeException("회원이 없습니다");
        Partner partner = optional.get();
        Shop shop = new Shop(partner, params.getName(), params.getBusiness_no(), params.getPhone_number(), params.getAddress(), params.getDetail_address(), params.getZip_code(), params.getX(), params.getY(), params.getStatus(), params.getOpen_at(), params.getClose_at(), params.getIntro(), params.getInstagram());
        shopRepository.save(shop);
        return shop.getId();
    }

    public ShopResDto getShopDetail(Long shopId) {
        Optional<Shop> optional = shopRepository.findById(shopId);
        if (optional.isEmpty()) throw new RuntimeException("가게가 없습니다.");
        Shop shop = optional.get();
        ShopResDto shopResDto = ShopResDto.entityToDto(shop);

        return shopResDto;
    }
}
