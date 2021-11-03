package ssafy.runner.controller.customer;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ssafy.runner.domain.dto.customer.KakaoPayApprovalDto;
import ssafy.runner.domain.dto.customer.KakaoPayApprovalRequestDto;
import ssafy.runner.domain.dto.customer.KakaoPayReadyResponseDto;
import ssafy.runner.domain.dto.customer.KakaoPayRequestDto;
import ssafy.runner.service.KakaoPayService;

@RestController
@RequiredArgsConstructor
@Api(tags = {"KakaoPay 관련 API"})
@RequestMapping("/kakaoPay")
public class CustomerKakaoController {

    private final KakaoPayService kakaoPayService;

    @PostMapping("/ready")
    @ApiOperation(value = "결제 준비, 성공시 결제 페이지 url 반환")
    public KakaoPayReadyResponseDto kakaoPayReady(@RequestBody KakaoPayRequestDto params) throws Exception {

        // return 할 때 tid도 같이 보내주는 JSON 형태 데이터 보내기
        return kakaoPayService.pay(params);
    }

    @PostMapping("/approval")
    @ApiOperation(value = "결제 승인 과정")
    public KakaoPayApprovalDto kakaoPayApproval(@RequestParam("pg_token") String pg_token, @RequestBody KakaoPayApprovalRequestDto params) {

        return kakaoPayService.kakaoPayInfo(pg_token, params);
    }
}
