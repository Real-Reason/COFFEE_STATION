package ssafy.runner.domain.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CustomerShop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="customer_shop_id")
    private Long id;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="shop_id", nullable = false)
    private Shop shop;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="customer_id", nullable = false)
    private Customer customer;
}
