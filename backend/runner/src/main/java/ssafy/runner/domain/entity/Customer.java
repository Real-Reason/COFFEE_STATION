package ssafy.runner.domain.entity;

import lombok.*;
import org.springframework.util.Assert;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="customer_id")
    private Long id;

    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;
    private String password;
    private String nickname;
    private String snsType;

    @NotBlank
    private String accessToken;

    @Builder
    public Customer(String username, String email, String accessToken) {
        Assert.hasText(username, "username must not empty");
        Assert.hasText(email, "email must not empty");
        Assert.hasText(accessToken, "accessToken must not empty");

        this.username = username;
        this.email = email;
        this.snsType = "google";
        this.accessToken = accessToken;
    }

    public String changeNickname(String nickname) {
        this.nickname = nickname;
        return nickname;
    }
}
