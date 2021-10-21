package ssafy.runner.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
}
