package ssafy.runner.domain.dto.customer;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KakaoPayReadyResponseDto {

    private String tid;
    private String success_url;

    public static KakaoPayReadyResponseDto entityToDto(String tid, String success_url) {

        return KakaoPayReadyResponseDto.builder()
                .tid(tid)
                .success_url(success_url)
                .build();
    }
}
