package ssafy.runner.domain.dto.menu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.MenuSize;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuSizeResponseDto {
    private Long MenuSizeId;
    private String menuSizeName;
    private Long menuId;
    private Long sizeId;
    private int price;

    public static MenuSizeResponseDto of(MenuSize menuSize){
        return new MenuSizeResponseDto(menuSize.getId(), menuSize.getSize().getType().toString(), menuSize.getMenu().getId(), menuSize.getSize().getId(), menuSize.getPrice());
    }
}
