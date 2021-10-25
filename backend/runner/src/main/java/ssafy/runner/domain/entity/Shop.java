package ssafy.runner.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // mappedBy가 아님, 영속화를 partner와 맞춰준다
    @JoinColumn(name = "partner_id") // partner의 어떤 필드와 연결시켜줄지 이름을 지정한다
    private Partner partner;

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

    @Builder
    public Shop(Partner partner, String name, String business_no, String phone_number, String address, String detail_address, String zip_code, String x, String y, ShopStatus status, String open_at, String close_at, String intro, String instagram) {
        this.partner = partner;
        this.name = name;
        this.business_no = business_no;
        this.phone_number = phone_number;
        this.address = address;
        this.detail_address = detail_address;
        this.zip_code = zip_code;
        this.x = x;
        this.y = y;
        this.status = status;
        this.open_at = open_at;
        this.close_at = close_at;
        this.intro = intro;
        this.instagram = instagram;
    }
}
