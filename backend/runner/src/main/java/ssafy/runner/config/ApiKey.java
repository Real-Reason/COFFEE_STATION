package ssafy.runner.config;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
@NoArgsConstructor
public class ApiKey {

    @Value("${kakao-admin}")
    private String kakaoKey;

    private static ApiKey instance = new ApiKey();

    public static ApiKey getInstance() {
        if (instance == null) {
            instance = new ApiKey();
        }
        return instance;
    }
}
