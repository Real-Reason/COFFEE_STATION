package ssafy.runner.domain.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

@Getter
public enum OrderStatus {
    // 고객이 주문만 한 상태
    ORDERED(000, "주문 완료"),
    // 고객이 결제완료한 상태
    PAID(001, "결제 완료"),
    // 매장에서 수락한 경우
    PREPARING(002, "메뉴 준비중"),
    // 메뉴 준비완료
    READY(003, "메뉴 준비 완료"),
    // 픽업된 주문건
    COMPLETED(004, "픽업 완료"),
    // 매장에서 거절한 경우
    REJECT(005, "주문 거절");

    private final int statusCode;
    private final String statusType;

    public static OrderStatus from(String status) {
        return OrderStatus.valueOf(status.toUpperCase());
    }

    OrderStatus(int statusCode, String statusType) {
        this.statusCode = statusCode;
        this.statusType = statusType;
    }
}
