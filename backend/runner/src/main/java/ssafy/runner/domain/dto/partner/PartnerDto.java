package ssafy.runner.domain.dto.partner;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.runner.domain.entity.Partner;

@Getter
@NoArgsConstructor
public class PartnerDto {
    private Long id;
    private String email;
    private String password;


    @Builder
    public PartnerDto(Long id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return "PartnerDto{" +
                "id" + id +
                ", email" + email +
                ", password" + password +
                "}";
    }

    public static PartnerDto entityToDto(Partner partner){
        return new PartnerDto(partner.getId(), partner.getEmail(), partner.getPassword());
    }
}
