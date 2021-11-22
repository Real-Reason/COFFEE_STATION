package ssafy.runner.domain.dto.menu;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.enums.MenuStatus;

import java.util.ArrayList;
import java.util.List;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuListResponseDto {
    List<MenuNSizeNExtraResponseDto> menuList = new ArrayList<>();

    public static MenuListResponseDto of(List<Menu> menuList) {
        MenuListResponseDto menuListResponseDto = new MenuListResponseDto();
        menuList.forEach(m -> {
            menuListResponseDto.getMenuList().add(MenuNSizeNExtraResponseDto.entityToDto(m));
        });
        return menuListResponseDto;
    }

    public static MenuListResponseDto canSale(List<Menu> menuList) {
        MenuListResponseDto menuListResponseDto = new MenuListResponseDto();
        menuList.forEach(m -> {
            if (m.getMenuStatus() != MenuStatus.NOT_SALE) {
                menuListResponseDto.getMenuList().add(MenuNSizeNExtraResponseDto.entityToDto(m));
            }
        });
        return menuListResponseDto;
    }


}