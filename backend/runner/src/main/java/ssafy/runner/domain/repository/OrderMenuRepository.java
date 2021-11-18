package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.entity.OrderMenu;
import ssafy.runner.domain.entity.Orders;
import ssafy.runner.domain.enums.OrderStatus;

import java.util.List;


public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {

    @Query("select sum(om.price * om.quantity) from OrderMenu om " +
            "where om.menu = :menu and om.order.status = :status")
    Integer findRevenueByMenu(@Param("menu") Menu menu, @Param("status") OrderStatus status);

    @Query("select distinct om  from OrderMenu om"+
            " join fetch om.order"+
            " join fetch om.menu"+
            " join fetch om.menuSize"+
            " left join fetch om.orderMenuExtras"+ // 이게 된다고?
            " where om.order.id = :orderId")
    List<OrderMenu> findOneFetched(@Param("orderId") Long orderId);

    @Query("select om from OrderMenu om" +
            " join fetch om.order" +
            " join fetch om.menu" +
            " where om.order.id = :orderId")
    List<OrderMenu> findOneSimpleById(@Param("orderId") Long orderId);
}
