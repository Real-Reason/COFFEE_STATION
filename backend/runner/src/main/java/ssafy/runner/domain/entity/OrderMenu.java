package ssafy.runner.domain.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class OrderMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_menu_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="order_id", nullable = false)
    private Orders order;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="menu_id", nullable = false)
    private Menu menu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="extra_id")
    private Extra extra;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="menu_size_id", nullable = false)
    private MenuSize menuSize;

    @ColumnDefault("1")
    @Positive
    private int quantity;

    @PositiveOrZero
    private int price;

    public OrderMenu(Orders order, Menu menu, MenuSize menuSize, int quantity) {
        this.order = order;
        this.menu = menu;
        this.menuSize = menuSize;
        this.quantity = quantity;
        this.price = quantity * (menu.getPrice() + menuSize.getPrice() + extra.getPrice());
    }

    @Builder
    public OrderMenu(Orders order, Menu menu, Extra extra, MenuSize menuSize, int quantity) {
        this.order = order;
        this.menu = menu;
        this.extra = extra;
        this.menuSize = menuSize;
        this.quantity = quantity;
        this.price = quantity * (menu.getPrice() + menuSize.getPrice() + extra.getPrice());
    }
}
