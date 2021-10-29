package ssafy.runner.domain.dto.menu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuSizeUpdateRequestDto {
    private Long menuSizeId;
    private Long sizeId;
    private int price;
}
