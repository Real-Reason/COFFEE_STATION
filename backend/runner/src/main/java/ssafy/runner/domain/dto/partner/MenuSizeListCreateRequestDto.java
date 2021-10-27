package ssafy.runner.domain.dto.partner;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuSizeListCreateRequestDto {
    private List<MenuSizeCreateRequestDto> menuSizeList = new ArrayList<>();
}
