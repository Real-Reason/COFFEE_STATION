package ssafy.runner.domain.dto.partner;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter @ToString
@NoArgsConstructor @AllArgsConstructor
public class MenuCreateResponseDto {
    private Long shopId;
    private Long categoryId;
    private Long menuId;
    private String imgUrl;
    private int price;
    private boolean isSignature;
}
