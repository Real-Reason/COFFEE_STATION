package ssafy.runner.domain.dto.customer.Like;

import lombok.*;
import ssafy.runner.domain.dto.shop.ShopResDto;
import ssafy.runner.domain.entity.CustomerShop;


@Getter
@ToString
@NoArgsConstructor
public class LikeShopResponseDto {

    private Long  customerShopId;
    private ShopResDto shop;

    @Builder
    public LikeShopResponseDto(Long customerShopId, ShopResDto shop) {
        this.customerShopId = customerShopId;
        this.shop = shop;
    }

    public static LikeShopResponseDto of(CustomerShop customerShop) {
        return LikeShopResponseDto.builder()
                .customerShopId(customerShop.getId())
                .shop(ShopResDto.entityToDto(customerShop.getShop()))
                .build();
    }

}
