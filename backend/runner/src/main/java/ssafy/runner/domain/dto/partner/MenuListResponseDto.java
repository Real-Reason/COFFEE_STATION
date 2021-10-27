package ssafy.runner.domain.dto.partner;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.Menu;

import java.util.ArrayList;
import java.util.List;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuListResponseDto {
    List<MenuResponseDto> menuList = new ArrayList<>();


    public static MenuListResponseDto of(List<Menu> menuList) {
        MenuListResponseDto menuListResponseDto = new MenuListResponseDto();
        menuList.forEach(m -> {
            menuListResponseDto.getMenuList().add(MenuResponseDto.of(m));
        });
        return menuListResponseDto;
    }
}
