package ssafy.runner.domain.dto.order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderMenuRequestDto {

    private Long menuId;
    private List<Long> extraIdList;
    private Long menuSizeId;
    private int quantity;
}
