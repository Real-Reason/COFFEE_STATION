package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.FirebaseTokenSaveRequestDto;
import ssafy.runner.domain.dto.partner.PartnerJoinResponseDto;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.repository.PartnerRepository;
import ssafy.runner.domain.repository.ShopRepository;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;
    private final ShopRepository shopRepository;

    @Transactional
    public PartnerJoinResponseDto join(String email, String password) {
        validateDuplicate(email);
        Partner partner = partnerRepository.save(new Partner(email, password));
        return PartnerJoinResponseDto.of(partner);
    }

    public boolean findPartnerExist(String email, String password) {
        return partnerRepository.existsByEmailAndPassword(email, password);
    }

    @Transactional
    public boolean saveOrUpdateFirebaseToken(String email, FirebaseTokenSaveRequestDto firebaseTokenSaveRequestDto) {
        Partner partner= partnerRepository.findByEmail(email)
                .orElseThrow(NoSuchElementException::new);
        partner.changeFirebaseToken(firebaseTokenSaveRequestDto.getFirebaseToken());
        return true;
    }

    private void validateDuplicate(String email){
        partnerRepository.findByEmail(email)
            .ifPresent(p -> {
                throw new IllegalStateException("이미 가입된 이메일 주소입니다.");
        });
    }

    public Boolean registerShop(String email) {
        Partner partner = partnerRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        Optional<Shop> shopNPartnerById = shopRepository.findShopNPartnerById(partner.getId());

        Boolean registerShop = true;

        if (shopNPartnerById.isEmpty()) {
            registerShop = false;
        }

        return registerShop;
    }
}
