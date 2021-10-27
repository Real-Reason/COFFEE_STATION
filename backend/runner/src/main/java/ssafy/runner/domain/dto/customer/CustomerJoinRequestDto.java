package ssafy.runner.domain.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerJoinRequestDto {
    private String email;
    private String password;
    private String passwordConfirm;
    private String nickname;
}
