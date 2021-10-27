package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
