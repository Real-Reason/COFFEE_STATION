package ssafy.runner.firebase;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.common.net.HttpHeaders;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import okhttp3.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class FirebaseCloudMessageService {
    // FirebaseCloudMessageService 객체를 생성하고, sendMessageTo() 메서드를 호출 하면 끝
    private final String API_URL = "https://fcm.googleapis.com/v1/projects/runner-b31dd/messages:send";
    private final ObjectMapper objectMapper;

    public void sendMessageTo(String targetToken, String title, String body, Long orderId) throws IOException {

        String message = makeMessage(targetToken, title, body, orderId);

        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json;")
                .build();
        System.out.println("=============================================================================");
        System.out.println("request = " + request);
        Response response = client.newCall(request).execute();
    }

    private String makeMessage(String targetToken, String title, String body, Long orderId) throws JsonProcessingException {
        FcmMessage fcmMessage = FcmMessage.builder()
                .message(FcmMessage.Message.builder()
                    .token(targetToken)
                    .notification(FcmMessage.Notification.builder()
                        .title(title)
                        .body(body)
                        .image(null)
                        .build()
                    )
                    .data(FcmMessage.FirebaseData.builder()
                        .orderId(String.valueOf(orderId))
                        .build())
                    .build()
                )
                .validate_only(false)
                .build();

        return objectMapper.writeValueAsString(fcmMessage);
    }

    // Access 토큰 발급
    private String getAccessToken() throws IOException {
        System.out.println("\n토큰 발급 시작함-===================================================\n");
        String firebaseConfigPath = "firebase/firebase-notification-key.json";

        GoogleCredentials googleCredentials = GoogleCredentials.fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));
        System.out.println("구글 크레덴셜 \n=============="+googleCredentials);
        googleCredentials.refreshIfExpired();
        System.out.println("\n=========발급한 토큰 생김새=================" + googleCredentials.getAccessToken().getTokenValue() + "\n");
        return googleCredentials.getAccessToken().getTokenValue();
    }
}
