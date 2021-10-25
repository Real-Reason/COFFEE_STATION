package ssafy.runner.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Extra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "extra_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", nullable = false)
    private Menu menu;

    @Size(max = 10)
    private String name;
    private int price;

    public Extra(Menu menu, String name) {
        this.menu = menu;
        this.name = name;
        this.price = 0;
    }

    public Extra(Menu menu, String name, int price) {
        this.menu = menu;
        this.name = name;
        this.price = price;
    }
}
