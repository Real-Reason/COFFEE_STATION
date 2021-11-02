package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.entity.OrderMenu;
import ssafy.runner.domain.enums.OrderStatus;


public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {

    @Query("select sum(om.price * om.quantity) from OrderMenu om " +
            "where om.menu = :menu and om.order.status = :status")
    Integer findRevenueByMenu(@Param("menu") Menu menu, @Param("status") OrderStatus status);
}
