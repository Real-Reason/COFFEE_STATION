package ssafy.runner.domain.dto.shop;

import lombok.*;
import org.locationtech.jts.geom.Point;
import ssafy.runner.domain.dto.partner.PartnerDto;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.enums.ShopStatus;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class ShopResDto {
    private Long id;
    private PartnerDto partner;
    private String name;
    private String business_no;
    private String phone_number;
    private String address;
    private String detail_address;
    private String zip_code;
//    private double x;
//    private double y;
    private String location;
    private ShopStatus status;
    private String open_at;
    private String close_at;
    private String intro;
    private String instagram;
    private List<String> imgUrlList;


    @Builder
    public ShopResDto(Long id, PartnerDto partner, String name, String business_no, String phone_number, String address, String detail_address, String zip_code, Point location, ShopStatus status, String open_at, String close_at, String intro, String instagram, List<String> imgUrlList) {
        this.id = id;
        this.partner = partner;
        this.name = name;
        this.business_no = business_no;
        this.phone_number = phone_number;
        this.address = address;
        this.detail_address = detail_address;
        this.zip_code = zip_code;
        this.location = location.toString();
        this.status = status;
        this.open_at = open_at;
        this.close_at = close_at;
        this.intro = intro;
        this.instagram = instagram;
        this.imgUrlList = imgUrlList;
    }

    public static ShopResDto entityToDto(Shop shop, List<String> imgUrlList) {
        return ShopResDto.builder()
                .id(shop.getId())
                .partner(PartnerDto.entityToDto(shop.getPartner()))
                .name(shop.getName())
                .business_no(shop.getBusiness_no())
                .phone_number(shop.getPhone_number())
                .address(shop.getAddress())
                .detail_address(shop.getDetail_address())
                .zip_code(shop.getZip_code())
                .location(shop.getLocation())
                .status(shop.getStatus())
                .open_at(shop.getOpen_at())
                .close_at(shop.getClose_at())
                .intro(shop.getIntro())
                .instagram(shop.getInstagram())
                .imgUrlList(imgUrlList)
                .build();
    }
}
