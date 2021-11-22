package ssafy.runner.domain.dto.order;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.enums.OrderStatus;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderUpdateRequestDto {

    private String status;
}
