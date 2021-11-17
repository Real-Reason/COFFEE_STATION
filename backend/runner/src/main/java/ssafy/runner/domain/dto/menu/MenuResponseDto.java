package ssafy.runner.domain.dto.menu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.Menu;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuResponseDto {
    private Long menuId;
    private Long shopId;
    private String shopName;
    private Long categoryId;
    private String name;
    private String imgUrl;
    private int price;
    private boolean signature;
    private String menuStatus;

    // 여기서 shop을 조회해서 shopId를 주는 것이 맞는 것인가 고민해보기
    public static MenuResponseDto of(Menu menu) {
        return new MenuResponseDto(menu.getId(), menu.getShop().getId(), menu.getShop().getName(), menu.getCategory().getId(), menu.getName(), menu.getImgUrl(), menu.getPrice(), menu.isSignature(), menu.getMenuStatus().toString());
    }

}
