package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.CustomerMenu;

import java.util.List;
import java.util.Optional;

public interface CustomerMenuRepository extends JpaRepository<CustomerMenu, Long>, CustomerMenuRepositoryCustom {

    @Query("select cm from CustomerMenu cm join fetch cm.menu m where cm.customer.id = :customerId")
    List<CustomerMenu> findAllByCustomerId(@Param("customerId") Long customerId);

    @Query("select cm from CustomerMenu cm" +
            " where cm.customer.id = :customerId" +
            " and cm.menu.id = :menuId")
    Optional<CustomerMenu> findLikeOrNot(@Param("menuId") Long menuId, @Param("customerId") Long id);
}
