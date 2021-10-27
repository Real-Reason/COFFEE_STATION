package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.Orders;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.enums.OrderStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {

    List<Orders> findByShop(Shop shop);
    List<Orders> findByShopAndDateAfter(Shop shop, LocalDateTime date);
    List<Orders> findByShopAndDateAfterAndStatus(Shop shop, LocalDateTime date, OrderStatus status);

}
