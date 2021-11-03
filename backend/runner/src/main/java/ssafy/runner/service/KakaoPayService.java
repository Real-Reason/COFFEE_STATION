package ssafy.runner.service;


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
import ssafy.runner.domain.dto.customer.*;

import java.net.URI;
import java.net.URISyntaxException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KakaoPayService {

    private static final String host = "https://kapi.kakao.com";
    private KakaoPayReadyDto kakaoPayReadyDto;
    private KakaoPayApprovalDto kakaoPayApprovalDto;

    public KakaoPayReadyResponseDto pay(KakaoPayRequestDto params) throws Exception{

        RestTemplate restTemplate = new RestTemplate();

        //서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + "3e407999a747d65a110a774338c57677");  // key 숨기기
//        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        MultiValueMap<String, String> kakaoParams = new LinkedMultiValueMap<>();
        kakaoParams.add("cid", params.getCid());
        kakaoParams.add("partner_order_id", params.getPartner_order_id());
        kakaoParams.add("partner_user_id", params.getPartner_user_id());
        kakaoParams.add("item_name", params.getItem_name());
        kakaoParams.add("quantity", params.getQuantity());
        kakaoParams.add("total_amount", params.getTotal_amount());
        kakaoParams.add("tax_free_amount", params.getTax_free_amount());
        kakaoParams.add("approval_url", params.getApproval_url());
        kakaoParams.add("cancel_url", params.getCancel_url());
        kakaoParams.add("fail_url", params.getFail_url());

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(kakaoParams, headers);

        try {
            kakaoPayReadyDto = restTemplate.postForObject(new URI(host + "/v1/payment/ready"), body, KakaoPayReadyDto.class);

            System.out.println(kakaoPayReadyDto.getNext_redirect_pc_url());
            return KakaoPayReadyResponseDto.entityToDto(kakaoPayReadyDto.getTid(), kakaoPayReadyDto.getNext_redirect_pc_url());

        } catch (RestClientException | URISyntaxException e) {
            e.printStackTrace();
        }

        return null;

    }

//    KakaoPayApprovalDto
    public KakaoPayApprovalDto kakaoPayInfo(String pg_token, KakaoPayApprovalRequestDto params) {

        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + "3e407999a747d65a110a774338c57677");  // key 숨기기
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 body
        MultiValueMap<String, String> kakaoParams = new LinkedMultiValueMap<>();
        kakaoParams.add("cid", params.getCid());
        kakaoParams.add("tid", params.getTid());
        kakaoParams.add("partner_order_id", params.getPartner_order_id());
        kakaoParams.add("partner_user_id", params.getPartner_user_id());
        kakaoParams.add("pg_token", pg_token);

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(kakaoParams, headers);

        try {
            kakaoPayApprovalDto = restTemplate.postForObject(new URI(host + "/v1/payment/approve"), body, KakaoPayApprovalDto.class);

            System.out.println("kakaoPayApprovalDto = " + kakaoPayApprovalDto);
            return kakaoPayApprovalDto;
        } catch (RestClientException | URISyntaxException e) {
            e.printStackTrace();
        }

        return null;
    }

}
