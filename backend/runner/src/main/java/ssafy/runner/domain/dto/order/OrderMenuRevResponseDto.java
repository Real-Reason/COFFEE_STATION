package ssafy.runner.domain.dto.order;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.entity.MenuSize;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderMenuRevResponseDto {
    private Long id;
    private Menu menu;
    private MenuSize menuSize;
    private int quantity;
    private int price;

}
