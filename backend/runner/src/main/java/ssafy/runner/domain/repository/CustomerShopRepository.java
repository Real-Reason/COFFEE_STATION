package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.CustomerShop;

public interface CustomerShopRepository extends JpaRepository<CustomerShop, Long> {


}
