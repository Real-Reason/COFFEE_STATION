package ssafy.runner.domain.dto.customer.order.detail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.Extra;
import ssafy.runner.domain.entity.OrderMenuExtra;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderMenuExtraDto {
    private String name;
    private int price;

    public static OrderMenuExtraDto of(OrderMenuExtra orderMenuExtra) {
        Extra extra = orderMenuExtra.getExtra();
        return new OrderMenuExtraDto(extra.getName(), extra.getPrice());
    }
}
