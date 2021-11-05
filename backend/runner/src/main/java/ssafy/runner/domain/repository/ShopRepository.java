package ssafy.runner.domain.repository;

import org.locationtech.jts.geom.Geometry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Shop;

import java.util.List;


public interface ShopRepository extends JpaRepository<Shop, Long> {
    @Query(value = "select name, address, detail_address " +
            " from shop where ST_Within(location, :circle)", nativeQuery = true)
    List<Shop> findNears(@Param("circle") Geometry circle);
}
