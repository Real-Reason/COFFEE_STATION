package ssafy.runner;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
class RunnerApplicationTests {

	@Test
	void contextLoads() {
        TestRequestDto testRequestDto = new TestRequestDto();
        testRequestDto.getB_no().add("0000000000");
        System.out.println(testRequestDto);
        Optional<TestErrorDto> optional = WebClient.create("https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=N02Y9nNfKAl+KKkiGUTEYGaua25Caj0mu3ER9saAQVUHVQ58nLlW89VuFkOnSm1z1u4dXZCc+pWKALqoIvIR2Q==")
            .method(HttpMethod.POST)
//            .uri(uriBuilder -> uriBuilder
//                .path("/validate")
//                .queryParam("serviceKey", "N02Y9nNfKAl+KKkiGUTEYGaua25Caj0mu3ER9saAQVUHVQ58nLlW89VuFkOnSm1z1u4dXZCc+pWKALqoIvIR2Q==")
//                .build())
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .bodyValue(testRequestDto)
            .retrieve()
            .onStatus(httpStatus -> HttpStatus.BAD_REQUEST.equals(httpStatus),
            clientResponse -> {
                System.out.println(clientResponse.headers().contentType());
                return Mono.empty();
            })
            .bodyToMono(TestErrorDto.class)
            .flux()
            .toStream()
            .findFirst();
        System.out.println(optional.get());

    }

    @Data
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TestErrorDto {
        public String code;
        public String msg;
    }

    @Data
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TestRequestDto {
        public List<String> b_no = new ArrayList<>();
    }


	@Data
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
	public static class TestDto {
	    public String request_cnt;
	    public String status_code;
	    public List<TestInnerDto> data = new ArrayList<>();
    }
    @Data
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TestInnerDto {
        public String b_no;
        public String b_stt;
        public String b_stt_cd;
        public String tax_type;
        public String tax_type_cd;
        public String end_dt;
        public String utcc_yn;
        public String tax_type_change_dt;
        public String invoice_apply_dt;
    }

}
