package ssafy.runner.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.entity.OrderMenu;
import ssafy.runner.domain.enums.OrderStatus;

import java.util.List;


public interface OrderMenuExtraRepository extends JpaRepository<OrderMenu, Long> {

}
