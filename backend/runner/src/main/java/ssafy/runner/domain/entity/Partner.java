package ssafy.runner.domain.entity;

import lombok.*;
import ssafy.runner.domain.dto.PartnerDto;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // IDENTITY 전략은 기본키 생성을 DB에 위임하기 위함, id를 설정하지 않고 INSERT QUERY를 날리면 그때 id값을 세팅
    @Column(name = "partner_id")
    private Long id;

    @Email
    private String email;

    @Size(min = 8, max = 50)
    private String password;

    @Builder
    public Partner(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
