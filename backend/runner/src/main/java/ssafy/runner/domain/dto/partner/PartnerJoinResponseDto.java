package ssafy.runner.domain.dto.partner;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.runner.domain.entity.Partner;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PartnerJoinResponseDto {
    private Long id;
    private String email;


    public static PartnerJoinResponseDto of(Partner partner) {
        return new PartnerJoinResponseDto(partner.getId(), partner.getEmail());
    }
}
