package ssafy.runner.domain.dto.partner;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.dto.ShopResDto;
import ssafy.runner.domain.dto.customer.CustomerNicknameDto;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.Orders;
import ssafy.runner.domain.enums.OrderStatus;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDto {

    private ShopResDto shop;
    // 추후 DTO 로 교체 필요
    private CustomerNicknameDto customerNickname;
    private LocalDateTime date;
    private OrderStatus status;
    private int totalPrice;
    private String request;

    public OrderResponseDto(Orders order) {
        this.customerNickname = new CustomerNicknameDto(order.getCustomer());
        this.date = order.getDate();
        this.status = order.getStatus();
        this.totalPrice = order.getTotalPrice();
    }
}
