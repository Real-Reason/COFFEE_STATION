package ssafy.runner.domain.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

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

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="order_id", nullable = false)
    private Orders order;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="menu_id", nullable = false)
    private Menu menu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="extra_id")
    private Extra extra;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="menu_size_id", nullable = false)
    private MenuSize menuSize;

    @ColumnDefault("1")
    @NotBlank
    private int quantity;

    @NotBlank
    private int price;

    @Builder
    public OrderMenu(int quantity, int price) {
        this.quantity = quantity;
        this.price = price;
    }
}
