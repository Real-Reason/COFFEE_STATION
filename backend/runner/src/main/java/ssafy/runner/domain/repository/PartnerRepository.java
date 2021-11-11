package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Partner;

import java.util.Optional;

public interface PartnerRepository extends JpaRepository<Partner, Long> {

    @Query("select p from Partner p" +
            " join fetch p.shop s" +
            " where p.email = :email")
    Optional<Partner> findByEmailWithShop(@Param("email") String email);
    Optional<Partner> findByEmailAndPassword(String email, String password);
    Optional<Partner> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByEmailAndPassword(String email, String password);

//    @Query("select p.firebaseToken from Partner p" +
//            " join fetch p.shop" +
//            " where p.shop.id = :shopId")
//    Optional<String> findFirebaseTokenById(@Param("shopId") Long shopId);

}
