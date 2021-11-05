package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Shop;

import java.util.List;

public interface ShopRepository extends JpaRepository<Shop, Long> {

//    @Query("select s from Shop s where s.x =:x ")
//    List<Shop> findByXAndY(@Param("x") String x, @Param("y") String y);
}
