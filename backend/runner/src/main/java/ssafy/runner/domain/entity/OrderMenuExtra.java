package ssafy.runner.domain.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class OrderMenuExtra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_menu_extra_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="order_menu_id", nullable = false)
    private OrderMenu orderMenu;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="extra_id", nullable = false)
    private Extra extra;

    public OrderMenuExtra(OrderMenu orderMenu, Extra extra) {
        this.orderMenu = orderMenu;
        this.extra = extra;
        orderMenu.getOrderMenuExtras().add(this);
    }
}
