package ssafy.runner.domain.dto.extra;

import lombok.*;
import ssafy.runner.domain.dto.menu.MenuResponseDto;
import ssafy.runner.domain.entity.Extra;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ExtraResponseDto {

    private Long extraId;
    private MenuResponseDto menu;
    private String name;
    private int price;

    public static ExtraResponseDto entityToDto(Extra extra) {
        return ExtraResponseDto.builder()
                .extraId(extra.getId())
                .menu(MenuResponseDto.of(extra.getMenu()))
                .name(extra.getName())
                .price(extra.getPrice())
                .build();
    }
}
