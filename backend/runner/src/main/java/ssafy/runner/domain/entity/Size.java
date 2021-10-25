package ssafy.runner.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.enums.SizeType;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "size_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private SizeType type; // 사이즈 종류

    public Size(SizeType type) {
        this.type = type;
    }
}
