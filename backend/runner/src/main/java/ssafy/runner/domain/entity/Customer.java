package ssafy.runner.domain.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.validator.constraints.Length;
import org.springframework.lang.Nullable;
import org.springframework.util.Assert;
import ssafy.runner.domain.enums.SnsType;

import javax.persistence.*;
import javax.validation.constraints.Email;
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

    @Email
    @NotNull
    @NotBlank
    private String email;

    @Size(min = 8, max = 20)
    private String password;

    @Size(min = 2, max = 10)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private SnsType snsType; // LOCAL 또는 GOOGLE로 Enum

    @Nullable
    private String accessToken; // sns 엑세스 토큰

    // 일반 객체 생성 -> 회원가입 : access는 Null이 된다
    public Customer(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.snsType = SnsType.LOCAL;
    }

    @Builder
    public Customer(String email, String accessToken) {
        Assert.hasText(email, "email must not empty");
        Assert.hasText(accessToken, "accessToken must not empty");
        this.email = email;
        this.snsType = SnsType.GOOGLE;
        this.accessToken = accessToken;
    }

    public String changeNickname(String nickname) {
        this.nickname = nickname;
        return nickname;
    }

    public void changeLocalToGoogle(String accessToken) {
        this.accessToken = accessToken;
        this.snsType = SnsType.GOOGLE;
    }
}
