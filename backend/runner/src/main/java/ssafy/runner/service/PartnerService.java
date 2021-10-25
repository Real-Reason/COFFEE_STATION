package ssafy.runner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.runner.domain.entity.OrderMenu;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.dto.PartnerDto;
import ssafy.runner.domain.repository.PartnerRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;

    @Transactional
    public Object join(PartnerDto params) {
        Partner partner = partnerRepository.save(new Partner(params.getEmail(), params.getPassword()));
        return PartnerDto.entityToDto(partner);
    }


}
