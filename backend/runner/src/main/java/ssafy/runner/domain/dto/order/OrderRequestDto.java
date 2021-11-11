package ssafy.runner.domain.dto.order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDto {

    private List<OrderMenuRequestDto> orderMenuList;
    private String request;

}
