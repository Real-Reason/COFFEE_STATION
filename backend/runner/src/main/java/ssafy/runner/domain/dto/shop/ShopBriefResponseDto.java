package ssafy.runner.domain.dto.shop;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.entity.Shop;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ShopBriefResponseDto {

    private String name;
    private String address;
    private String detail_address;
    private double distanceFrom;

    public ShopBriefResponseDto(Shop shop, double distance) {

        this.name = shop.getName();
        this.address = shop.getAddress();
        this.detail_address = shop.getDetail_address();
        this.distanceFrom = distance;
    }

}
