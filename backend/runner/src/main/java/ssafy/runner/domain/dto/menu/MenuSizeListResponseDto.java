package ssafy.runner.domain.dto.menu;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.MenuSize;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuSizeListResponseDto {

    List<MenuSizeResponseDto> menuSizeList = new ArrayList<>();

    public static MenuSizeListResponseDto of(List<MenuSize> menuSizeList) {
        MenuSizeListResponseDto menuSizeListResponseDto = new MenuSizeListResponseDto();
        menuSizeList.forEach(m -> {
            menuSizeListResponseDto.getMenuSizeList().add(MenuSizeResponseDto.of(m));
        });
        return menuSizeListResponseDto;
    }
}
