package ssafy.runner.domain.dto.order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.entity.Orders;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRevenueResponseDto {

    private LocalDateTime date;
    private int revenue;

    public OrderRevenueResponseDto(Orders order, int revenue) {
        this.date = order.getDate();
        this.revenue = revenue;
    }
}
