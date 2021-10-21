package ssafy.runner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.Partner;

public interface PartnerRepository extends JpaRepository<Partner, Long> {
    Partner save(Partner partner);

}
