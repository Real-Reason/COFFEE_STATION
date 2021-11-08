package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ssafy.runner.domain.dto.customer.ShopAndMenuResponseDto;
import ssafy.runner.domain.dto.shop.ShopBriefResponseDto;
import ssafy.runner.domain.dto.shop.ShopReqDto;
import ssafy.runner.domain.dto.shop.ShopResDto;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.entity.ShopImage;
import ssafy.runner.domain.enums.ShopStatus;
import ssafy.runner.domain.repository.PartnerRepository;
import ssafy.runner.domain.repository.ShopImageRepository;
import ssafy.runner.domain.repository.ShopRepository;

import java.io.IOException;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ShopService {

    private final ShopRepository shopRepository;
    private final PartnerRepository partnerRepository;

    // 근처 카페 리스트 가져오기
    public List<ShopBriefResponseDto> findNearShopList(String x, String y) {
        List<ShopBriefResponseDto> shopList = new ArrayList<>();
//        List<Shop> sameSectionShopList = sho
        return shopList;
    }

    @Transactional
    public Long save(ShopReqDto params, Long partnerId) throws IOException {

        Optional<Partner> optional = partnerRepository.findById(partnerId);
        if (optional.isEmpty()) throw new RuntimeException("회원이 없습니다");
        Partner partner = optional.get();
        Shop shop = new Shop(partner, params.getName(), params.getBusiness_no(), params.getPhone_number(), params.getAddress(), params.getDetail_address(), params.getZip_code(), params.toEntity().getLocation(), params.getStatus(), params.getOpen_at(), params.getClose_at(), params.getIntro(), params.getInstagram());
        shopRepository.save(shop);

        return shop.getId();
    }

    public ShopResDto getShopDetail(Long shopId) {

        Optional<Shop> optional = shopRepository.findById(shopId);
        if (optional.isEmpty()) throw new RuntimeException("가게가 없습니다.");
        Shop shop = optional.get();
        return ShopResDto.entityToDto(shop);
    }

    @Transactional
    public void changeShopStatus(String status, Long shopId) {

        Shop shop = shopRepository.getById(shopId);
        ShopStatus enumStatus = ShopStatus.valueOf(status);
        shop.changeShopStatus(enumStatus);
    }

    @Transactional
    public ShopAndMenuResponseDto getShopAndMenu(Long shopId) {

        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(NoSuchElementException::new);
        return ShopAndMenuResponseDto.entityToDto(shop);
    }

}
