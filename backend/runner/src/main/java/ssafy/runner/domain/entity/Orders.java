package ssafy.runner.domain.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.util.Assert;
import ssafy.runner.domain.enums.OrderStatus;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_id")
    private Long id;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="shop_id", nullable = false)
    private Shop shop;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="customer_id", nullable = false)
    private Customer customer;

    @NotBlank
    @CreatedDate
    private LocalDateTime date;

    // DB에 Enum 상수값을 그대로 저장하기 위한 어노테이션
    @Enumerated(EnumType.STRING)
    @NotBlank
    private OrderStatus status;

    @NotBlank
    private int totalPrice;

    @Size(max = 30)
    private String request;

    @Builder
    public Orders(Shop shop, Customer customer, int totalPrice) {
        Assert.hasText(String.valueOf(totalPrice),"총 금액을 입력해주세요");

        this.shop = shop;
        this.customer = customer;
        this.status = OrderStatus.PAID;
        this.totalPrice = totalPrice;
    }
}
