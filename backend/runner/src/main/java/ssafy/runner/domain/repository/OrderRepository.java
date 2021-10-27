package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.runner.domain.entity.Orders;

public interface OrderRepository extends JpaRepository<Orders, Long> {
}
