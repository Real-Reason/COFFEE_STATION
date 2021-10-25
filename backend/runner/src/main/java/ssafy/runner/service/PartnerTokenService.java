package ssafy.runner.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.repository.PartnerRepository;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartnerTokenService {

    private final PartnerRepository partnerRepository;


    public Partner join(String email, String password) {
        Partner partner = new Partner(email, password);
        return partnerRepository.save(partner);
    }

    public boolean findPartnerExist(String email, String password) {
        return partnerRepository.existsByEmailAndPassword(email, password);
    }
}
