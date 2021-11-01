package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.CustomerMenu;

public interface CustomerMenuRepository extends JpaRepository<CustomerMenu, Long> {

}
