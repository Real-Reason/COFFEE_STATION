package ssafy.runner.firebase;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@AllArgsConstructor
public class FcmMessageReqDto {

    private String targetToken;
    private String title;
    private String body;
    private Long orderId;
}
