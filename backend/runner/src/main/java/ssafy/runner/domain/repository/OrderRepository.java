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
    @Query("select o from Orders o join fetch o.customer " +
            "where o.shop = :shop")
    List<Orders> findByShop(@Param("shop") Shop shop);

    @Query("select o from Orders o join fetch o.customer " +
            "where o.shop = :shop and o.date > :date")
    List<Orders> findByShopAndDateAfter(@Param("shop") Shop shop, @Param("date") LocalDateTime date);

    @Query("select o from Orders o join fetch o.customer " +
            "where o.shop = :shop and o.date > :date and o.status = :status")
    List<Orders> findByShopAndDateAfterAndStatus(@Param("shop") Shop shop,
                                                 @Param("date") LocalDateTime date,
                                                 @Param("status") OrderStatus status);

    @Query("select sum(o.totalPrice) from Orders o " +
            "where o.shop = :shop and o.status = :status and " +
            "o.date > :startDateTime and o.date < :endDateTime")
    Integer findRevenueListByDays(@Param("shop") Shop shop,
                                        @Param("startDateTime") LocalDateTime startDateTime,
                                        @Param("endDateTime") LocalDateTime endDateTime,
                                        @Param("status") OrderStatus status);
    @Query("select sum(o.totalPrice) from Orders o where o.shop = :shop and o.status = :status")
    Integer findTotalRevenue(@Param("shop") Shop shop, @Param("status") OrderStatus status);
}
