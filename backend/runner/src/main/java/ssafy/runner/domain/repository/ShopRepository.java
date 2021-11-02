package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.Shop;

public interface ShopRepository extends JpaRepository<Shop, Long> {
}
