package ssafy.runner.domain.entity;

import lombok.*;
import org.springframework.util.Assert;
import ssafy.runner.domain.enums.SnsType;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="customer_id")
    private Long id;

    @NotNull
    @Column(unique = true)
    private String email;

    @Size(min = 8, max = 20)
    private String password;
    private String firebaseToken = "";

    @Size(min = 2, max = 10)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private SnsType snsType; // LOCAL 또는 GOOGLE로 Enum

    public Customer(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.snsType = SnsType.LOCAL;
    }

    @Builder
    public Customer(String nickname, String email) {
        Assert.hasText(email, "email must not empty");
        this.nickname = nickname;
        this.email = email;
        this.snsType = SnsType.GOOGLE;
    }

    public String changeNickname(String nickname) {
        this.nickname = nickname;
        return nickname;
    }

    public void changeLocalToGoogle(String accessToken) {
        this.snsType = SnsType.GOOGLE;
    }
    public void changeFirebaseToken(String firebaseToken) {
        this.firebaseToken = firebaseToken;
        System.out.println("firebaseToken이 커스토머에 저장됨 " + firebaseToken +"요렇게 ㅋㅋ");
    }
}
