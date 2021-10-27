package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.entity.Shop;

import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    // 카테고리도 같이 조회해야 함

    @Query("select m from Menu m join fetch m.category c where m.shop.id = :shopId")
    List<Menu> findAllByShopWithCategory(@Param("shopId") Long shopId);

    Optional<Menu> findByShopAndId(Shop shop, Long id);
}
