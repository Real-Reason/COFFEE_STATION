package ssafy.runner.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.dto.PartnerDto;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Partner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // IDENTITY 전략은 기본키 생성을 DB에 위임하기 위함, id를 설정하지 않고 INSERT QUERY를 날리면 그때 id값을 세팅
    @Column(name = "partner_id")
    private Long id;

    private String email;

    private String password;

    @Builder
    public Partner(Long id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public PartnerDto entityToDto(){
        return PartnerDto.builder()
                .id(id)
                .email(email)
                .password(password)
                .build();
    }
}
