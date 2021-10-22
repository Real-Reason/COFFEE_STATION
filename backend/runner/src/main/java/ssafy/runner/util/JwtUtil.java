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

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

/**
 * jwt 토큰 유틸 정의.
 */
@Slf4j
@Getter
@Component
@RequiredArgsConstructor
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    private Long expirationTime = 60*60*1000L; // 1시간
    //    private Long expirationTime = 1000L; // 1초
    private String TOKEN_PREFIX = "Bearer ";
    private String HEADER_STRING = "Authorization";
    private String ISSUER = "runner";


    // 토큰 검증 : 재사용 가능한 verifier 객체가 리턴된다.
    public JWTVerifier getVerifier() {
        log.warn(secret);
        return JWT
            .require(Algorithm.HMAC512(secret.getBytes()))
            .withIssuer(ISSUER)
            .build();
    }
    // 토큰 생성 : 고정 만료시간 지정된 토큰 -> 추후 어떤 내용을 넣을지 변수로 넣어주어야 함
    public String createToken(String userId) {
        log.warn("createToken 호출");
        log.warn("userId : "+ userId);
        Date expires = this.createTokenExpiration(this.expirationTime);
        return JWT.create()
            .withSubject(userId)
            .withExpiresAt(expires)
            .withIssuer(ISSUER)
            .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
            .sign(Algorithm.HMAC512(secret.getBytes()));
    }
    // 토큰 생성 : 지정 expires가 지정된 토큰?
    public String createToken(Instant expires, String userId) {
        return JWT.create()
            .withSubject(userId)
            .withExpiresAt(Date.from(expires))
            .withIssuer(ISSUER)
            .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
            .sign(Algorithm.HMAC512(secret.getBytes()));
    }
    // 토큰 만료시간 생성 (현재시간 + 만료시간)
    public Date createTokenExpiration(Long expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    // 토큰 검증 : 복호화된 데이터를 리턴한다
    public DecodedJWT verifyToken(String token) {
        JWTVerifier verifier = JWT
            .require(Algorithm.HMAC512(secret.getBytes()))
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
