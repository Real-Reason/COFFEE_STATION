package ssafy.runner.domain.dto.shop;

import lombok.*;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.enums.ShopStatus;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class ShopReqDto {

    private Long id;
    private String name;
    private String business_no;
    private String phone_number;
    private String address;
    private String detail_address;
    private String zip_code;
    private String x;
    private String y;

    private ShopStatus status;

    private String open_at;
    private String close_at;
    private String intro;
    private String instagram;

    @Builder
    public ShopReqDto(Long id, String name, String business_no, String phone_number, String address, String detail_address, String zip_code, String x, String y, ShopStatus status, String open_at, String close_at, String intro, String instagram) {
        this.id = id;
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
    }

    public static ShopReqDto entityToDto(Shop shop) {
        return ShopReqDto.builder()
                .id(shop.getId())
                .name(shop.getName())
                .business_no(shop.getBusiness_no())
                .phone_number(shop.getPhone_number())
                .address(shop.getAddress())
                .detail_address(shop.getDetail_address())
                .zip_code(shop.getZip_code())
                .x(shop.getX())
                .y(shop.getY())
                .status(shop.getStatus())
                .open_at(shop.getOpen_at())
                .close_at(shop.getClose_at())
                .intro(shop.getIntro())
                .instagram(shop.getInstagram())
                .build();
    }
}
