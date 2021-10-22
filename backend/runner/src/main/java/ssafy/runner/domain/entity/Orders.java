package ssafy.runner.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="customer_id")
    private Long id;

    @NotBlank
    @OneToOne(mappedBy = "shop")
    private Shop shop;

    @NotBlank
    @OneToOne(mappedBy = "customer")
    private Customer customer;

    @NotBlank
    @CreatedDate
    private LocalDateTime date;

    // 미완성enum으로할거임
    @NotBlank
    private String status;

    @NotBlank
    private int totalPrice;

    @NotBlank
    private String request;

    // 빌드생성자 필요

}
