package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.Extra;

public interface ExtraRepository extends JpaRepository<Extra, Long> {
}
