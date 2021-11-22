package ssafy.runner.domain.dto.customer;

import lombok.*;
import ssafy.runner.domain.dto.menu.MenuListResponseDto;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.enums.ShopStatus;

import java.util.ArrayList;
import java.util.List;

@Getter @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShopAndMenuResponseDto {
    private Long id;
    private MenuListResponseDto menuList;
    private String name;
    private String business_no;
    private String phone_number;
    private String address;
    private String detail_address;
    private String zip_code;
    private double x;
    private double y;
    private ShopStatus status;
    private String open_at;
    private String close_at;
    private String intro;
    private String instagram;
    private List<String> imgUrlList = new ArrayList<>();
    private Boolean customerLikeShop;

    @Builder
    public ShopAndMenuResponseDto(Long id, MenuListResponseDto menuList, String name, String business_no, String phone_number, String address, String detail_address, String zip_code, double x, double y, ShopStatus status, String open_at, String close_at, String intro, String instagram, List<String> imgUrlList, Boolean customerLikeShop) {
        this.id = id;
        this.menuList = menuList;
        this.name = name;
        this.business_no = business_no;
        this.phone_number = phone_number;
        this.address = address;
        this.detail_address = detail_address;
        this.zip_code = zip_code;
        this.x = x;
        this.y = y;
        this.status = status;
        this.open_at = open_at;
        this.close_at = close_at;
        this.intro = intro;
        this.instagram = instagram;
        this.imgUrlList = imgUrlList;
        this.customerLikeShop = customerLikeShop;
    }

    public static ShopAndMenuResponseDto entityToDto(Shop shop, List<String> imgUrlList, Boolean customerLikeShop) {
        return ShopAndMenuResponseDto.builder()
                .id(shop.getId())
                .menuList(MenuListResponseDto.of(shop.getMenuList()))
                .name(shop.getName())
                .business_no(shop.getBusiness_no())
                .phone_number(shop.getPhone_number())
                .address(shop.getAddress())
                .detail_address(shop.getDetail_address())
                .zip_code(shop.getZip_code())
                .x(shop.getLocation().getX())
                .y(shop.getLocation().getY())
                .status(shop.getStatus())
                .open_at(shop.getOpen_at())
                .close_at(shop.getClose_at())
                .intro(shop.getIntro())
                .instagram(shop.getInstagram())
                .imgUrlList(imgUrlList)
                .customerLikeShop(customerLikeShop)
                .build();
    }


    public static ShopAndMenuResponseDto entityToDtoCanSale(Shop shop, List<String> imgUrlList, Boolean customerLikeShop) {
        return ShopAndMenuResponseDto.builder()
                .id(shop.getId())
                .menuList(MenuListResponseDto.canSale(shop.getMenuList()))
                .name(shop.getName())
                .business_no(shop.getBusiness_no())
                .phone_number(shop.getPhone_number())
                .address(shop.getAddress())
                .detail_address(shop.getDetail_address())
                .zip_code(shop.getZip_code())
                .x(shop.getLocation().getX())
                .y(shop.getLocation().getY())
                .status(shop.getStatus())
                .open_at(shop.getOpen_at())
                .close_at(shop.getClose_at())
                .intro(shop.getIntro())
                .instagram(shop.getInstagram())
                .imgUrlList(imgUrlList)
                .customerLikeShop(customerLikeShop)
                .build();
    }
}
