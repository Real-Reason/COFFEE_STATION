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

    private Long id;
    private String name;
    private String address;
    private String detail_address;
    private String shopImgUrl = "https://coffee-station.s3.ap-northeast-2.amazonaws.com/thum_detail.jpg";
    private double lat;
    private double lng;
    private double distanceFrom;

    public ShopBriefResponseDto(Shop shop, double distance, String shopImgUrl) {
        this.id = shop.getId();
        this.name = shop.getName();
        this.address = shop.getAddress();
        this.detail_address = shop.getDetail_address();
        this.shopImgUrl = shopImgUrl;
        this.lat = shop.getLocation().getY();
        this.lng = shop.getLocation().getX();
        this.distanceFrom = distance;
    }

    public ShopBriefResponseDto(Shop shop) {
        this.id = shop.getId();
        this.name = shop.getName();
        this.address = shop.getAddress();
        this.detail_address = shop.getDetail_address();
        if (shop.getShopImageList().size() != 0){
            this.shopImgUrl = shop.getShopImageList().get(0).getImgUrl();
        }
    }
}
