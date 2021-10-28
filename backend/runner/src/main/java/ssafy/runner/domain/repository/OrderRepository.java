package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Orders;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.enums.OrderStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByShop(Shop shop);
    List<Orders> findByShopAndDateAfter(Shop shop, LocalDateTime date);
    List<Orders> findByShopAndDateAfterAndStatus(Shop shop, LocalDateTime date, OrderStatus status);

    @Query("select o.totalPrice from Orders o " +
            "where o.shop = :shop and o.status = :status and " +
            "o.date > :startDateTime and o.date < :endDateTime")
    List<Integer> findRevenueListByDays(@Param("shop") Shop shop,
                                        @Param("startDateTime") LocalDateTime startDateTime,
                                        @Param("endDateTime") LocalDateTime endDateTime,
                                        @Param("status") OrderStatus status);

}
