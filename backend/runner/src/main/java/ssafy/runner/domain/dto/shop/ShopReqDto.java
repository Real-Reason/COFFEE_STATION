package ssafy.runner.domain.dto.shop;

import lombok.*;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.ParseException;
import ssafy.runner.domain.entity.Partner;
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
    private double x;
    private double y;
    private Point location;
    private ShopStatus status;
    private String open_at;
    private String close_at;
    private String intro;
    private String instagram;

    @Builder
    public ShopReqDto(String name, String business_no, String phone_number, String address, String detail_address, String zip_code, ShopStatus status, String open_at, String close_at, String intro, String instagram) {

        this.name = name;
        this.business_no = business_no;
        this.phone_number = phone_number;
        this.address = address;
        this.detail_address = detail_address;
        this.zip_code = zip_code;
        this.status = status;
        this.open_at = open_at;
        this.close_at = close_at;
        this.intro = intro;
        this.instagram = instagram;
    }

    public Shop toEntity(Point point, Partner partner) throws ParseException {
        return Shop.builder()
                .partner(partner)
                .name(this.name)
                .business_no(this.business_no)
                .phone_number(this.phone_number)
                .address(this.address)
                .detail_address(this.detail_address)
                .zip_code(this.zip_code)
                .location(point)
                .status(this.status)
                .open_at(this.open_at)
                .close_at(this.close_at)
                .intro(this.intro)
                .instagram(this.instagram)
                .build();
    }
}
