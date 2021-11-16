package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.CustomerShop;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface CustomerShopRepository extends JpaRepository<CustomerShop, Long>, CustomerShopRepositoryCustom {

    @Query("select cs from CustomerShop cs " +
            "join fetch cs.shop s " +
            "where cs.customer.id = :customerId")
    List<CustomerShop> findAllByCustomerId(@Param("customerId") Long customerId);

    @Query("select cs from CustomerShop cs" +
            " where cs.customer.id = :customerId" +
            " and cs.shop.id = :shopId")
    Optional<CustomerShop> findLikeOrNot(@Param("customerId") Long customerId, @Param("shopId") Long shopId);
}
