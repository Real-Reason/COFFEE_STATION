package ssafy.runner.domain.dto.customer.Like;

import lombok.*;
import ssafy.runner.domain.entity.CustomerShop;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LikeShopListResponseDto {

    List<LikeShopResponseDto> likeShopList = new ArrayList<>();

    public static LikeShopListResponseDto of(List<CustomerShop> customerShopList) {
        LikeShopListResponseDto likeShopListResponseDto = new LikeShopListResponseDto();
        customerShopList.forEach(cs -> {
            likeShopListResponseDto.getLikeShopList().add(LikeShopResponseDto.of(cs));
        });
        return likeShopListResponseDto;
    }
}
