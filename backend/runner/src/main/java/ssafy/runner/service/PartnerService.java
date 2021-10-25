package ssafy.runner.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.dto.PartnerDto;
import ssafy.runner.domain.repository.PartnerRepository;

@Service
public class PartnerService {

    private final PartnerRepository partnerRepository;

    public PartnerService(PartnerRepository partnerRepository) {
        this.partnerRepository = partnerRepository;
    }

    @Transactional
    public Object join(PartnerDto params) {
        Partner partner = partnerRepository.save(Partner.builder()
            .email(params.getEmail())
            .password(params.getPassword())
            .build());

        return PartnerDto.entityToDto(partner);
    }


}
