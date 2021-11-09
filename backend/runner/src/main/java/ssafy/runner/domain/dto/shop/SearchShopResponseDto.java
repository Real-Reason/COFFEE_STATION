package ssafy.runner.domain.dto.shop;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.entity.Shop;
import ssafy.runner.domain.enums.ShopStatus;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchShopResponseDto {

    private Long shopId;
    private String name;
    private String phone_number;
    private ShopStatus status;
    private String open_at;
    private String close_at;

    private String imgUrl;

    public static SearchShopResponseDto entityToDto(Shop shop, String imgUrl) {

        return SearchShopResponseDto.builder()
                .shopId(shop.getId())
                .name(shop.getName())
                .phone_number(shop.getPhone_number())
                .status(shop.getStatus())
                .open_at(shop.getOpen_at())
                .close_at(shop.getClose_at())
                .imgUrl(imgUrl)
                .build();
    }

}
