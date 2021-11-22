package ssafy.runner.domain.dto.menu;

import lombok.*;
import ssafy.runner.domain.dto.extra.ExtraListResponseDto;
import ssafy.runner.domain.dto.shop.ShopBriefResponseDto;
import ssafy.runner.domain.dto.shop.ShopResDto;
import ssafy.runner.domain.dto.shop.ShopSimpleResponseDto;
import ssafy.runner.domain.entity.Menu;
import ssafy.runner.domain.enums.MenuStatus;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuNSizeNExtraResponseDto {
    private Long id;
//    private ShopResDto shop;
    private ShopSimpleResponseDto shop;
    private ExtraListResponseDto extraList;
    private MenuSizeListResponseDto menuSizeList;
    private String name;
    private String imgUrl;
    private int price;
    private boolean isSignature;
    private MenuStatus menuStatus;
    private boolean customerLikeMenu;

    @Builder
    public MenuNSizeNExtraResponseDto(Long id, ShopSimpleResponseDto shop, ExtraListResponseDto extraList, MenuSizeListResponseDto menuSizeList,
                                      String name, String imgUrl, int price, boolean isSignature, MenuStatus menuStatus, boolean customerLikeMenu) {
        this.id = id;
        this.shop = shop;
        this.extraList = extraList;
        this.menuSizeList = menuSizeList;
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.isSignature = isSignature;
        this.menuStatus = menuStatus;
        this.customerLikeMenu = customerLikeMenu;
    }

    public static MenuNSizeNExtraResponseDto entityToDto(Menu menu, boolean customerLikeMenu) {
        return MenuNSizeNExtraResponseDto.builder()
                .id(menu.getId())
//                .shop(ShopResDto.entityToDto(menu.getShop()))
                .shop(new ShopSimpleResponseDto(menu.getShop()))
                .extraList(ExtraListResponseDto.of(menu.getExtraList()))
                .menuSizeList(MenuSizeListResponseDto.of(menu.getMenuSizeList()))
                .name(menu.getName())
                .imgUrl(menu.getImgUrl())
                .price(menu.getPrice())
                .isSignature(menu.isSignature())
                .menuStatus(menu.getMenuStatus())
                .customerLikeMenu(customerLikeMenu)
                .build();
    }

    public static MenuNSizeNExtraResponseDto entityToDto(Menu menu) {
        return MenuNSizeNExtraResponseDto.builder()
                .id(menu.getId())
                .shop(new ShopSimpleResponseDto(menu.getShop()))
                .extraList(ExtraListResponseDto.of(menu.getExtraList()))
                .menuSizeList(MenuSizeListResponseDto.of(menu.getMenuSizeList()))
                .name(menu.getName())
                .imgUrl(menu.getImgUrl())
                .price(menu.getPrice())
                .isSignature(menu.isSignature())
                .menuStatus(menu.getMenuStatus())
                .build();
    }

}
