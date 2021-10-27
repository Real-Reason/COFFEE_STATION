package ssafy.runner.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity @Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    private Shop shop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private String name;
    private String imgUrl; // 디폴트 이미지 넣어주는걸로 변경하기
    private int price;


    @Column(name = "is_signature")
    private boolean isSignature;

    @Builder
    public Menu(Shop shop, Category category, String name, String imgUrl, int price, boolean isSignature) {
        this.shop = shop;
        this.category = category;
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.isSignature = isSignature;
    }

    public void updateMenu(Category category, String name, String imgUrl, int price, boolean isSignature) {
        this.name = name;
        this.imgUrl = imgUrl;
        this.price = price;
        this.isSignature = isSignature;
    }
}
