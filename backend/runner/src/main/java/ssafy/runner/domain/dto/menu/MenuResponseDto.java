package ssafy.runner.domain.dto.menu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.entity.MenuSize;

import java.util.List;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuResponseDto {
    private Long id;
    private Long menuId;
    private Long shopId;
    private String shopName;
    private Long categoryId;
    private String categoryName;
    private String name;
    private String imgUrl;
    private int price;
    private boolean signature;
    private String menuStatus;
    MenuSizeListResponseDto menuSizeList;

    // 여기서 shop을 조회해서 shopId를 주는 것이 맞는 것인가 고민해보기
    public static MenuResponseDto of(Menu menu) {

        return new MenuResponseDto(
                menu.getId(),
                menu.getId(),
                menu.getShop().getId(),
                menu.getShop().getName(),
                menu.getCategory().getId(),
                menu.getCategory().getName(),
                menu.getName(),
                menu.getImgUrl(),
                menu.getPrice(),
                menu.isSignature(),
                menu.getMenuStatus().toString(),
                MenuSizeListResponseDto.of(menu.getMenuSizeList())
        );
    }

}
