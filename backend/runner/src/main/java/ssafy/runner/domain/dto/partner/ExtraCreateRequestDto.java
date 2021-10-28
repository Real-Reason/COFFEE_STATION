package ssafy.runner.domain.dto.partner;

import lombok.*;
import ssafy.runner.domain.entity.Extra;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ExtraCreateRequestDto {

    private String name;
    private int price;

    public ExtraCreateRequestDto entityToDto(Extra extra) {
        return ExtraCreateRequestDto.builder()
                .name(extra.getName())
                .price(extra.getPrice())
                .build();
    }

}
