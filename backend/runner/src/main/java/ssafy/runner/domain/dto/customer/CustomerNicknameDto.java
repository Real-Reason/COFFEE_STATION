package ssafy.runner.domain.dto.customer;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.entity.Customer;

@Getter
@NoArgsConstructor
public class CustomerNicknameDto {

    private String nickname;

    @Builder
    public CustomerNicknameDto(Customer customer) {
        this.nickname = customer.getNickname();
    }

    public Customer toEntity() {
        return Customer.builder()
                .nickname(nickname)
                .build();
    }
}
