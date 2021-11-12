package ssafy.runner.domain.dto.customer.Like;

import lombok.*;
import ssafy.runner.domain.dto.shop.ShopResDto;
import ssafy.runner.domain.dto.shop.ShopSimpleResponseDto;
import ssafy.runner.domain.entity.CustomerShop;


@Getter
@ToString
@NoArgsConstructor
public class LikeShopResponseDto {

    private Long  customerShopId;
    private ShopSimpleResponseDto shop;

    @Builder
    public LikeShopResponseDto(Long customerShopId, ShopSimpleResponseDto shop) {
        this.customerShopId = customerShopId;
        this.shop = shop;
    }

    public static LikeShopResponseDto of(CustomerShop customerShop) {
        return LikeShopResponseDto.builder()
                .customerShopId(customerShop.getId())
                .shop(new ShopSimpleResponseDto(customerShop.getShop()))
                .build();
    }

}
