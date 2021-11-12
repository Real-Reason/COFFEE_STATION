package ssafy.runner.firebase;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
// Push 알림을 보내기 위한 Request Body 형식
// 이 객체는 Object Mapper에 의해 String으로 변되어 Request Body에 포함됨
public class FcmMessage {
    //실제로 메시지를 전달하지 않고 요청을 테스트하기위한 플래그
    private boolean validate_only;
    // 필수 값. 보낼 메시지
    private Message message;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Message {

        // 모든 모바일 OS에 적용되는 노티피케이션
        private Notification notification;
        // 특정 디바이스에 알림을 보내기 위한 기기 토큰 token, topic, condition 중 하나만 지정
        private String token;
        // 메시지에 보내고 싶은 데이터 추가하기
        private FirebaseData data;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Notification {

        private String title;
        private String body;
        private String image;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class FirebaseData {

        private String orderId;
    }

}
