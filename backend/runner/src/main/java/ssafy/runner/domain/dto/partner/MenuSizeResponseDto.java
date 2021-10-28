package ssafy.runner.domain.dto.partner;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.MenuSize;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuSizeResponseDto {
    private Long menuSizeId;
    private Long menuId;
    private Long sizeId;
    private int price;

    public static MenuSizeResponseDto of(MenuSize menuSize){
        return new MenuSizeResponseDto(menuSize.getId(), menuSize.getMenu().getId(), menuSize.getSize().getId(), menuSize.getPrice());
    }
}