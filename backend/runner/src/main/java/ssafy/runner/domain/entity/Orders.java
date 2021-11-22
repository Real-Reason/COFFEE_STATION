package ssafy.runner.domain.entity;

import lombok.*;
import org.hibernate.criterion.Order;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.util.Assert;
import ssafy.runner.domain.enums.OrderStatus;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"shop", "customer"})
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="shop_id", nullable = false)
    private Shop shop;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="customer_id", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    List<OrderMenu> orderMenuList = new ArrayList<>();

    @NotNull
    @CreatedDate
    private LocalDateTime date = LocalDateTime.now().plusHours(9L);

    // DB에 Enum 상수값을 그대로 저장하기 위한 어노테이션
    @Enumerated(EnumType.STRING)
    @NotNull
    private OrderStatus status;

    @NotNull
    private int totalPrice;

    @Size(max = 30)
    private String request;

    @Builder
    public Orders(Shop shop, Customer customer, OrderStatus status, int totalPrice, String request) {

        Assert.notNull(shop, "샵 정보는 필수 입니다.");
        Assert.notNull(customer, "고객 정보는 필수입니다.");
        Assert.notNull(status, "상태 정보는 필수 입니다.");
        this.shop = shop;
        this.customer = customer;
        this.status = status;
        this.totalPrice = totalPrice;
        this.request = request;
    }

    public void modifyOrderStatus(OrderStatus status) {
        this.status = status;
    }

    public void modifyOrderPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }
}
