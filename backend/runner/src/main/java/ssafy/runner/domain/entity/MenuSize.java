package ssafy.runner.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString(exclude = {"menu", "size"})
public class MenuSize {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_size_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", nullable = false)
    private Menu menu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "size_id", nullable = false)
    private Size size;

    private int price;


    public MenuSize(Menu menu, Size size, int price) {
        this.menu = menu;
        this.size = size;
        this.price = price;
    }

    public void changeMenuSize(Menu menu, Size size, int price) {
        this.menu = menu;
        this.size = size;
        this.price = price;
    }
}
