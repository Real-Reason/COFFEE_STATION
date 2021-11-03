package ssafy.runner.domain.dto.customer.order.detail;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.*;
import ssafy.runner.domain.enums.SizeType;

import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderMenuDto {
    private String menuName;
    private SizeType menuSize;
    private int quantity;
    // 어떤걸 넣지? 우선 할인이 적용되지 않은 Menu.getPrice를 넣을 예정.
    private int price;

    private List<OrderMenuExtraDto> extras = new ArrayList<>(); // name과 추가 가격만 넣은 리스트

    public static OrderMenuDto of(OrderMenu orderMenu){
        Menu menu = orderMenu.getMenu();
        Size size = orderMenu.getMenuSize().getSize();
        List<OrderMenuExtra> orderMenuExtras = orderMenu.getOrderMenuExtras();

        List<OrderMenuExtraDto> extraDtoList = new ArrayList<>();
        orderMenuExtras.forEach(e->{
            extraDtoList.add(OrderMenuExtraDto.of(e));

        });
        return new OrderMenuDto(menu.getName(), size.getType(), orderMenu.getQuantity(), menu.getPrice(), extraDtoList);
    }
}
