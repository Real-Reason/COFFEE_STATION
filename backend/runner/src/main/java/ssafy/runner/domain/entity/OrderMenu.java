package ssafy.runner.domain.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = {"order", "menu", "menuSize", "orderMenuExtras"})
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

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="menu_size_id", nullable = false)
    private MenuSize menuSize;

    @OneToMany(mappedBy = "orderMenu", cascade = CascadeType.ALL)
    private List<OrderMenuExtra> orderMenuExtras = new ArrayList<>();

    @ColumnDefault("1")
    @Positive
    private int quantity;

    @PositiveOrZero
    private int price;

    @Builder
    public OrderMenu(Orders order, Menu menu, MenuSize menuSize, int quantity) {
        this.order = order;
        this.menu = menu;
        this.menuSize = menuSize;
        this.quantity = quantity;
        this.price = quantity;
    }
}
