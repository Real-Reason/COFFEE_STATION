package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.MenuSize;

public interface MenuSizeRepository extends JpaRepository<MenuSize, Long> {
}
