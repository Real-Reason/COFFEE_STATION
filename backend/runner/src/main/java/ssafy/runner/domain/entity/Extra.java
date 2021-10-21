package ssafy.runner.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Extra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "extra_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    private Menu menu;

    private String name;
    private Integer price;
}
