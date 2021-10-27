package ssafy.runner.domain.dto.partner;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuCreateResponseDto {
    private Long menuId;
    private Long shopId;
    private Long categoryId;
    private String name;
    private String imgUrl;
    private int price;
    private boolean signature;
}
