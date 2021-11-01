package ssafy.runner.domain.dto.extra;

import lombok.*;
import ssafy.runner.domain.entity.Extra;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ExtraListResponseDto {

    List<ExtraResponseDto> extraList = new ArrayList<>();

    public static ExtraListResponseDto of(List<Extra> extraList) {
        ExtraListResponseDto extraListResponseDto = new ExtraListResponseDto();
        extraList.forEach(m -> {
            extraListResponseDto.getExtraList().add(ExtraResponseDto.entityToDto(m));
        });
        return extraListResponseDto;
    }


}
