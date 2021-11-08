package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.ShopImage;

public interface ShopImageRepository extends JpaRepository<ShopImage, Long> {
}
