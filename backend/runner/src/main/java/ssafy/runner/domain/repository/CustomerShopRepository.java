package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.CustomerShop;

import java.util.List;

public interface CustomerShopRepository extends JpaRepository<CustomerShop, Long> {

    @Query("select cs from CustomerShop cs join fetch cs.shop s where cs.customer.id = :customerId")
    List<CustomerShop> findAllByCustomerId(@Param("customerId") Long customerId);
}
