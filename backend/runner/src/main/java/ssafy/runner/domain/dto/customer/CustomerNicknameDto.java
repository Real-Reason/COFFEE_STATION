package ssafy.runner.domain.dto.customer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.entity.Customer;

@Getter
@NoArgsConstructor
public class CustomerNicknameDto {

    private String nickname;

    public CustomerNicknameDto(Customer customer) {
        this.nickname = customer.getNickname();
    }
}
