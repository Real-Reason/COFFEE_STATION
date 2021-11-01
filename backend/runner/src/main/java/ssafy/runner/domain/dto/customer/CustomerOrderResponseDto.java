package ssafy.runner.domain.dto.customer;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.Orders;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.enums.OrderStatus;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerOrderResponseDto {

    private Long shopId;
    private String shopName;

    private LocalDateTime date;
    private OrderStatus status; // 주문 상태
    private int totalPrice; // 총 가격 넣어야 함


    public static CustomerOrderResponseDto of(Orders order) {
        Shop shop = order.getShop();
        return new CustomerOrderResponseDto(shop.getId(), shop.getName(), order.getDate(), order.getStatus(), order.getTotalPrice());
    }

}
