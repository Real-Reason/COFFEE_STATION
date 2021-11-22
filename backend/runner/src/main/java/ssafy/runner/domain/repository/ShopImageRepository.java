package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.ShopImage;

import java.util.List;
import java.util.Optional;

public interface ShopImageRepository extends JpaRepository<ShopImage, Long> {

//    @Query("select si.imgUrl from ShopImage si " +
//            "where si.id = :shopImageId and si.idx = :index")
//    Optional<String> findByIdAndIndex(@Param("shopImageId") Long id, @Param("index") int index);

    @Query("select si.imgUrl from ShopImage si" +
            " join si.shop s" +
            " where s.id = :shopId and si.idx = :index")
    Optional<String> findByShopIdAndIndex(@Param("shopId") Long shopId, @Param("index") int index);

    @Query("select si.imgUrl from ShopImage si" +
            " join si.shop s" +
            " where s.id = :shopId")
    List<String> findAllByShopId(@Param("shopId") Long shopId);
}
