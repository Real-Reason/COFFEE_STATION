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
    // 가게정보
    private Long shopId;
    private String shopName;
    // 주문정보
    private LocalDateTime date;
    private OrderStatus status;
    private int totalPrice; // 할인 적용 전의 순수가격을 넣는것이 낫지 않을까?
    private String request;
    // 주문 메뉴 정보
    List<OrderMenuDto> menus = new ArrayList<>();
    // 참고 : 메뉴 자체에 대한 가격과, 엑스트라에 대한 가격을 모두 넣는다
    // 대신 할인 수단이 나중에 추가될 것을 고려해 할인에 대한 정보를 여기에 추후 추가해서 실제 가격에 대한 산정이 필요해보임
    // 마찬가지로 나중에 쿠폰 결제가 추가될 경우를 생각해서 추후 결제 타입에 대한 정보도 적는 등 수정이 필요함

    public static OrderDetailResDto of(List<OrderMenu> orderMenuList) {
        Orders order = orderMenuList.get(0).getOrder();
        Shop shop = order.getShop();

        List<OrderMenuDto> menusDto = new ArrayList<>();
        orderMenuList.forEach(om -> {
            menusDto.add(OrderMenuDto.of(om));

        });
        return new OrderDetailResDto(shop.getId(), shop.getName(), order.getDate(), order.getStatus(), order.getTotalPrice(), order.getRequest(), menusDto);

    }
}
