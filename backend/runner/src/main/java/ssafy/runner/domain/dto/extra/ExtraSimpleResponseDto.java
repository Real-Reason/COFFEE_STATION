package ssafy.runner.domain.dto.extra;

import lombok.*;
import ssafy.runner.domain.dto.menu.MenuResponseDto;
import ssafy.runner.domain.entity.Extra;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExtraSimpleResponseDto {

    private Long extraId;
    private String name;
    private int price;

    public static ExtraSimpleResponseDto entityToDto(Extra extra) {
        return ExtraSimpleResponseDto.builder()
                .extraId(extra.getId())
                .name(extra.getName())
                .price(extra.getPrice())
                .build();
    }
}
