package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.dto.partner.PartnerJoinResponseDto;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.repository.PartnerRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;

    @Transactional
    public PartnerJoinResponseDto join(String email, String password) {
        Partner partner = partnerRepository.save(new Partner(email, password));
        return PartnerJoinResponseDto.of(partner);
    }

    public boolean findPartnerExist(String email, String password) {
        return partnerRepository.existsByEmailAndPassword(email, password);
    }
}
