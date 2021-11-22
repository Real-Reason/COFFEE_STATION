package ssafy.runner.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = {"shop"})
public class ShopImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_image_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    private String imgUrl;
    private int idx;

    @Builder
    public ShopImage(Shop shop, String imgUrl, int idx) {
        this.shop = shop;
        this.imgUrl = imgUrl;
        this.idx = idx;
    }
}
