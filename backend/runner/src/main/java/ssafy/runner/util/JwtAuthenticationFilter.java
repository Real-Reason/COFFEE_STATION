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
        String header = request.getHeader("Authorization"); // 요청의 헤더에 토큰이 들어있다.
        // 헤더 중 Authorization 시작하는 키가 없거나, Bearer 시작하는 값이 아니라면
        if (header == null || !header.startsWith("Bearer ")) {
            System.out.println("헤더가 없거나, Bearer로 시작하지 않음");
            // setAuthentication을 안하고 그냥 응답해줘도 세션이 없으므로 문제가 생기지 않는다.
        }else{
            // 검증과정 시작
            try {
                log.warn("JwtAuthenticationFilter try 실행");
                String token = request.getHeader("Authorization");
                Algorithm algorithm = Algorithm.HMAC512(jwtUtil.getSecret());

                log.warn("verifier 생성");
                JWTVerifier verifier = jwtUtil.getVerifier();
                // 토큰 검증
                log.warn("Decode 시작 : 이것도 사실 Util 내에서 handleError를 통해 잡아내야 하는 것 같음");
                DecodedJWT decodedJWT = verifier.verify(token.replace("Bearer ", ""));
                log.warn("Decode 종료");
                // 스켈레톤 코드는 토큰 생성 시에 Subject를 넣어주었었음. 이를 토대로 DB 조회
                String issuer = decodedJWT.getIssuer();
                log.warn(decodedJWT.getSubject()); // 실제 저장한 name을 잘 복호화해서 가져왔음
                // DB 검색도 다 마치고, 유저가 있다고 가정하자
                // 정상 유저인 경우, UsernamePasswordAuthenticationToken 생성
                UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken("김준영", null, null);
                // 얘가 핵심 : 얘가 없으면 인증이 되지 않는다.
                SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);
            } catch (Exception e) {
                System.out.println("에러 발생! : "+e);
            }
        }
        chain.doFilter(request, response); // 모든 과정이 끝났으므로 필터체인을 실행? 이따 다시보기
    }
}
