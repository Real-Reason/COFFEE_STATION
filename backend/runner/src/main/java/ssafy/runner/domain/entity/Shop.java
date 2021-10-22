package ssafy.runner.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_id")
    private Long id;

//    @OneToOne(mappedBy = "partner", fetch = FetchType.LAZY)
//    private Partner partner;

    private String name;
    private String business_no;
    private String phone_number;
    private String address;
    private String detail_address;
    private String zip_code;
    private String x;
    private String y;

    @Enumerated(EnumType.STRING)
    private ShopStatus status;

    private String open_at;
    private String close_at;
    private String intro;
    private String instagram;

}
