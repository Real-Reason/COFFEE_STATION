package ssafy.runner.domain.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class KakaoPayApprovalRequestDto {

    private String cid;
    private String tid;
    private String partner_order_id;
    private String partner_user_id;
}
