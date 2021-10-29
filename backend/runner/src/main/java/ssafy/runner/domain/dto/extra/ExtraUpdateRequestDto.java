package ssafy.runner.domain.dto.extra;

import lombok.*;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ExtraUpdateRequestDto {

    private Long id;
    private String name;
    private int price;

}
