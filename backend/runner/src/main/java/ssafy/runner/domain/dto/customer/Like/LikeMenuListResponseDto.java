package ssafy.runner.domain.dto.customer.Like;

import lombok.*;
import ssafy.runner.domain.entity.CustomerMenu;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LikeMenuListResponseDto {

    List<LikeMenuResponseDto> likeMenuList = new ArrayList<>();

    public static LikeMenuListResponseDto of(List<CustomerMenu> customerMenuList) {
        LikeMenuListResponseDto likeMenuListResponseDto = new LikeMenuListResponseDto();
        customerMenuList.forEach(cm -> {
            likeMenuListResponseDto.getLikeMenuList().add(LikeMenuResponseDto.of(cm));
        });
        return likeMenuListResponseDto;
    }
}
