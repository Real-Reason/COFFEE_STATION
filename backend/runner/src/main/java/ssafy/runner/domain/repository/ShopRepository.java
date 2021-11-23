package ssafy.runner.domain.repository;

import org.locationtech.jts.geom.Geometry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.entity.Shop;

import java.util.List;
import java.util.Optional;


public interface ShopRepository extends JpaRepository<Shop, Long>, ShopRepositoryCustom{
    @Query(value = "select * " +
            " from shop where ST_Within(location, :circle)", nativeQuery = true)
    List<Shop> findNears(@Param("circle") Geometry circle);

    @Query(value = "select s from Shop s" +
                    " join fetch s.partner" +
                    " where s.partner.id = :partnerId")
    Optional<Shop> findShopNPartnerById(@Param("partnerId") Long partnerId);

    @Query(value = "select s from Shop s join fetch s.partner where s.partner.email = :email")
    Optional<Shop> findShopByEmail(@Param("email") String email);
}
