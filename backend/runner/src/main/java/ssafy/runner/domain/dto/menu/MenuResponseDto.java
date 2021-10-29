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
    private Long categoryId;
    private String name;
    private String imgUrl;
    private int price;
    private boolean signature;
    private String menuStatus;

    public static MenuResponseDto of(Menu menu) {
        return new MenuResponseDto(menu.getId(), menu.getCategory().getId(), menu.getName(), menu.getImgUrl(), menu.getPrice(), menu.isSignature(), menu.getMenuStatus().toString());
    }

}
