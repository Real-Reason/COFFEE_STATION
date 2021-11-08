package ssafy.runner.domain.dto.shop;

import lombok.*;
import ssafy.runner.domain.entity.ShopImage;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
@Builder
public class ShopImageResponseDto {

    private Long shopImageId;
    private Long shopId;
    private String imgUrl;
    private int idx;

    public static ShopImageResponseDto entityToDto(ShopImage shopImage) {
        return ShopImageResponseDto.builder()
                .shopImageId(shopImage.getId())
                .shopId(shopImage.getShop().getId())
                .imgUrl(shopImage.getImgUrl())
                .idx(shopImage.getIdx())
                .build();
    }
}
