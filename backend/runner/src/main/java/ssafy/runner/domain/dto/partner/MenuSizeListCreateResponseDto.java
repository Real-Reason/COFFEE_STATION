package ssafy.runner.domain.dto.partner;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.MenuSize;

import java.util.ArrayList;
import java.util.List;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuSizeListCreateResponseDto {
    private List<MenuSizeCreateResponseDto> menuSizeList = new ArrayList<>();


    public static MenuSizeListCreateResponseDto of(List<MenuSize> menuSizeList) {
        List<MenuSizeCreateResponseDto> responseDtos = new ArrayList<>();
        menuSizeList.forEach(ms->{
            responseDtos.add(MenuSizeCreateResponseDto.of(ms));
        });
        return new MenuSizeListCreateResponseDto(responseDtos);
    }
}
