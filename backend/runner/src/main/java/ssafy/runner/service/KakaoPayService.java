package ssafy.runner.service;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import ssafy.runner.config.ApiKey;
import ssafy.runner.domain.dto.customer.KakaoPayReadyDto;
import ssafy.runner.domain.dto.customer.KakaoPayRequestDto;

import java.net.URI;
import java.net.URISyntaxException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KakaoPayService {

    String host = "https://kapi.kakao.com";
    private KakaoPayReadyDto kakaoPayReadyDto;

    private ApiKey apiKey = ApiKey.getInstance();
    private final String kakaoKey = apiKey.getKakaoKey();

    @Transactional
    public String pay(KakaoPayRequestDto params) throws Exception {

        System.out.println("==========================================");
        System.out.println("kakaoKey = " + kakaoKey);
        System.out.println("==========================================");

        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK" + kakaoKey);
        headers.add("Accept", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> kakaoParam = new LinkedMultiValueMap<String, String>();
        kakaoParam.add("cid", params.getCid());
        kakaoParam.add("partner_order_id", params.getPartner_order_id());
        kakaoParam.add("partner_user_id", params.getPartner_user_id());
        kakaoParam.add("item_name", params.getItem_name());
        kakaoParam.add("quantity", params.getQuantity());
        kakaoParam.add("total_amount", params.getTotal_amount());
        kakaoParam.add("tax_free_amount", params.getTax_free_amount());
        kakaoParam.add("approval_url", params.getApproval_url());
        kakaoParam.add("cancel_url", params.getCancel_url());
        kakaoParam.add("fail_url", params.getFail_url());

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(kakaoParam, headers);

        try {
            kakaoPayReadyDto = restTemplate.postForObject(new URI(host + "/v1/payment/ready"), body, KakaoPayReadyDto.class);
            System.out.println("==========================================");
            System.out.println(kakaoPayReadyDto);
            System.out.println("==========================================");

            return kakaoPayReadyDto.getNext_redirect_pc_url();
        } catch (RestClientException e) {
            e.printStackTrace();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return "/pay";
    }
}
