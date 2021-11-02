package ssafy.runner.domain.dto.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class KakaoPayRequestDto {

    private String cid;   // 테스트 결제일 경우 TC0ONETIME 으로 통일
    private String partner_order_id;  // 가맹점 주문번호
    private String partner_user_id;   // 가맹점 회원 id
    private String item_name;   // 상품명
    private String quantity;   // 상품수량
    private String total_amount;   // 상품 총액
    private String tax_free_amount;  // 상품 비과세 금액
    private String approval_url; // 결제 성공시 redirect url
    private String cancel_url; // 결제 취소시 redirect url
    private String fail_url; // 결제 실패시 redirect url
}
