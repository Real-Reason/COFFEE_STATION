package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.Size;

public interface SizeRepository extends JpaRepository<Size, Long> {
}
