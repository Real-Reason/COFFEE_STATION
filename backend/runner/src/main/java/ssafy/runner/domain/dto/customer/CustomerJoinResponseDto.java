package ssafy.runner.domain.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.dto.partner.PartnerJoinResponseDto;
import ssafy.runner.domain.entity.Customer;
import ssafy.runner.domain.entity.Partner;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerJoinResponseDto {
    private Long id;
    private String email;
    private String nickname;

    public static CustomerJoinResponseDto of(Customer customer) {
        return new CustomerJoinResponseDto(customer.getId(), customer.getEmail(), customer.getNickname());
    }
}
