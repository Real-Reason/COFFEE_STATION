package ssafy.runner.domain.dto.shop;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.entity.Shop;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ShopSimpleResponseDto {
    private Long id;
    private String name;
    private String address;
    private String detail_address;
    private String location;

    public ShopSimpleResponseDto(Shop shop) {
        this.id = shop.getId();
        this.name = shop.getName();
        this.address = shop.getAddress();
        this.detail_address = shop.getDetail_address();
        this.location = shop.getLocation().toString();
    }
}
