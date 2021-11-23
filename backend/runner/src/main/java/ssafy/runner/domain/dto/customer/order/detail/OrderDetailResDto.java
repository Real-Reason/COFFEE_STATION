package ssafy.runner.domain.dto.customer.order.detail;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import ssafy.runner.domain.entity.*;
import ssafy.runner.domain.enums.OrderStatus;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResDto {
    private Long orderId;
    // 가게정보
    private Long shopId;
    private String shopName;
    private String shopImgUrl;
    // 주문정보
    private LocalDateTime date;
    private OrderStatus status;
    private int totalPrice;
    private String request;

    // 주문 메뉴 정보
    List<OrderMenuDto> menus = new ArrayList<>();
    // 참고 : 메뉴 자체에 대한 가격과, 엑스트라에 대한 가격을 모두 넣는다

    public static OrderDetailResDto of(List<OrderMenu> orderMenuList) {
        System.out.println("orderMenuList========" + orderMenuList.get(0));
        Orders order = orderMenuList.get(0).getOrder();
        System.out.println("order~~~~~~~~~" + order.toString());
        Shop shop = order.getShop();
        List<OrderMenuDto> orderMenusDto = new ArrayList<>();

        orderMenuList.forEach(om -> {
            orderMenusDto.add(OrderMenuDto.of(om));
        });
        return new OrderDetailResDto(
                order.getId(),
                shop.getId(),
                shop.getName(),
                shop.getShopImageList().get(0).getImgUrl(),
                order.getDate(),
                order.getStatus(),
                order.getTotalPrice(),
                order.getRequest(),
                orderMenusDto
        );
    }
}
