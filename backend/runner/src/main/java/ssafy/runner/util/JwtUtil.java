package ssafy.runner.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ssafy.runner.domain.entity.Partner;
import ssafy.runner.domain.enums.UserType;
import ssafy.runner.service.CustomerService;
import ssafy.runner.service.CustomerTokenService;
import ssafy.runner.service.PartnerService;
import ssafy.runner.service.PartnerTokenService;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * jwt 토큰 유틸 정의.
 */
@Slf4j
@Getter
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final PartnerTokenService partnerTokenService;
    private final CustomerTokenService customerTokenService;

    @Value("${jwt.secret}")
    private String SECRET; // final을 달면 에러가 발생한다. 유의할 것
    private Long expirationTime = 60*60*1000L; // 1시간
    //    private Long expirationTime = 1000L; // 1초
    private final String TOKEN_PREFIX = "Bearer ";
    private final String HEADER_STRING = "Authorization";
    private final String ISSUER = "Runner";
    private final String ACCESS_TOKEN = "AccessToken";
    private final String REFRESH_TOKEN = "RefreshToken";
    private final String AUDIENCE = "CoffeeStation";


    // 토큰 생성 : 고정 만료시간 지정된 토큰
    // 로그인 시 생성해 줄 것이기 때문에, 또는 만료시 재발급 해줄 것이기 때문에
    // 무슨 조건으로 검색할지와 무슨 항목을 토큰에 넣어줄지 모두 지정해야 함
    // 파트너와 손님이 공통으로 들어가는 항목이면 좋을 것 : email, id
    // 실제로 createToken은 객체 조회 후 호출될 것이므로?? 맞나?
    // 1. 여기서 객체 찾기와 토큰 생성 둘 다 처리함 v ->username과 password를 받아야 함

    public String createToken(String email, String password, UserType userType) {
        return createToken(email, password, userType, this.expirationTime);
    }

    // 토큰 생성 : 지정 expires가 지정
    public String createToken(String email, String password, UserType userType, Long expires) {
        boolean result = userType.equals(UserType.PARTNER)
            ? partnerTokenService.findPartnerExist(email, password)
            : customerTokenService.findCustomerExist(email, password);

        if (!result) throw new RuntimeException("유저가 없습니다"); // 추후 커스텀 예외로 변경하기

        // 토큰 커스텀 클레임으로 role(유저 종류), owner(email) 넣기
        Map<String, Object> payloadClaims = new HashMap();
        payloadClaims.put("role", userType.toString());
        payloadClaims.put("owner", email);

        // 토큰 생성 및 리턴
        return JWT.create()
            .withIssuer(ISSUER) // 발급자 (필수)
            .withSubject(ACCESS_TOKEN) // 토큰 제목 (필수)
            .withAudience(AUDIENCE) // 대상서비스 (필수)
            .withExpiresAt(this.createTokenExpiration(expires)) // 만료시간 (필수)
            .withPayload(payloadClaims)
            .sign(Algorithm.HMAC512(SECRET.getBytes()));
//            .withNotBefore() // 지정 시간 이후 유효 (선택)
//            .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant())) // 토큰 발행 시간(선택)
//            .withJWTId() // 토큰 고유 id로 중복 토큰 발근 제한 (선택)
    }

    // 토큰 만료시간 생성 (현재시간 + 만료시간)
    public Date createTokenExpiration(Long expirationTime) {
        return new Date(new Date().getTime() + expirationTime);
    }

    // 토큰 검증 : 재사용 가능한 verifier 객체가 리턴된다.
    public JWTVerifier getVerifier() {
        log.warn(SECRET);
        return JWT
            .require(Algorithm.HMAC512(SECRET.getBytes()))
            .withIssuer(ISSUER)
            .build();
    }

    // 토큰 검증 : 복호화된 데이터를 리턴한다
    public DecodedJWT verifyToken(String token) {
        JWTVerifier verifier = JWT
            .require(Algorithm.HMAC512(SECRET.getBytes()))
            .withIssuer(ISSUER)
            .build();
        try {
            return verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}
