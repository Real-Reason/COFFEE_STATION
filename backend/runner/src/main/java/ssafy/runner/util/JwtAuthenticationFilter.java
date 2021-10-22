package ssafy.runner.util;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private JwtUtil jwtUtil;

    //아직 user 서비스를 인자로 받아오지 않음 실행 확인만 한다.
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        super(authenticationManager);
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.warn("필터 실행");
        String token = request.getHeader("Authorization"); // 요청의 헤더에 토큰이 들어있다.
        // 헤더 중 Authorization 시작하는 키가 없거나, Bearer 시작하는 값이 아니라면
        if (token != null && token.startsWith("Bearer ")) {
            try {
                log.warn("JwtAuthenticationFilter try 실행");
                DecodedJWT decodedJWT = jwtUtil.verifyToken(token);
                log.warn("Decode 종료");
                // 스켈레톤 코드는 토큰 생성 시에 Subject를 넣어주었었음. 이를 토대로 DB 조회

                log.warn(decodedJWT.getIssuer()); // Issuer
                log.warn(decodedJWT.getSubject()); // Subject
                // DB 검색도 다 마치고, 유저가 있다고 가정하자
                // 정상 유저인 경우, UsernamePasswordAuthenticationToken 생성
                // principal : id, credentials : 비밀번호 : 의미없지않나..왜쓰는거지
//                UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken("runner", null, null);
                // 얘가 핵심 : 얘가 없으면 인증이 되지 않는다.
                SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(decodedJWT.getIssuer(), null, null));
            } catch (Exception e) {
                System.out.println("에러 발생! : "+e);
            }
        }
        chain.doFilter(request, response); // 모든 과정이 끝났으므로 필터체인을 실행? 이따 다시보기
    }
}
