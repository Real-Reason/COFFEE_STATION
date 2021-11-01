package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Customer;
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

    @Query("select sum(o.totalPrice) from Orders o where o.shop = :shop and o.status = :status")
    Integer findTotalRevenue(@Param("shop") Shop shop, @Param("status") OrderStatus status);



    /*
    * Customer 관련 로직
    * */

    /*
     * 손님이 주문한 모든 오더를 가져옴. 이 경우 fetch join으로 Shop을 한번에 가져오는 게 좋음. 하지만 일단 조회 날려보기 N+1 발생하나
     * 조회 쿼리가 얼마나 나가는지 확인할 것
     * */
    List<Orders> findByCustomer(Customer customer);
}
