package ssafy.runner.domain.dto.customer.Like;

import lombok.*;
import ssafy.runner.domain.dto.menu.MenuResponseDto;
import ssafy.runner.domain.entity.CustomerMenu;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LikeMenuResponseDto {

    private Long customerMenuId;
    private MenuResponseDto menu;

    public static LikeMenuResponseDto of(CustomerMenu customerMenu) {
        return LikeMenuResponseDto.builder()
                .customerMenuId(customerMenu.getId())
                .menu(MenuResponseDto.of(customerMenu.getMenu()))
                .build();
    }

}
