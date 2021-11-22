package ssafy.runner.domain.entity;

import lombok.*;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.ParseException;
import ssafy.runner.domain.enums.ShopStatus;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name="Shop")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = {"partner", "menuList"})
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // mappedBy가 아님, 영속화를 partner와 맞춰준다
    @JoinColumn(name = "partner_id") // partner의 어떤 필드와 연결시켜줄지 이름을 지정한다
    private Partner partner;

    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL)
    private List<Menu> menuList = new ArrayList<>();

    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL)
    private List<ShopImage> shopImageList = new ArrayList<>();

    private String name;
    private String business_no;
    private String phone_number;
    private String address;
    private String detail_address;
    private String zip_code;
    private Point location;
    @Enumerated(EnumType.STRING)
    private ShopStatus status;

    private String open_at;
    private String close_at;
    private String intro;
    private String instagram;

    @Builder
    public Shop(Partner partner, String name, String business_no, String phone_number, String address, String detail_address, String zip_code, org.locationtech.jts.geom.Point location, ShopStatus status, String open_at, String close_at, String intro, String instagram) throws ParseException {
        this.partner = partner;
        this.name = name;
        this.business_no = business_no;
        this.phone_number = phone_number;
        this.address = address;
        this.detail_address = detail_address;
        this.zip_code = zip_code;
        this.location = location;
        this.status = status;
        this.open_at = open_at;
        this.close_at = close_at;
        this.intro = intro;
        this.instagram = instagram;
    }
    public void changeShopStatus(ShopStatus status) {
        this.status = status;
    }
}
