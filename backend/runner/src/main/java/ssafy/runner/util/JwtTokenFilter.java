package ssafy.runner.util;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.warn("필터 실행");
        String token = request.getHeader("Authorization"); // 요청의 헤더에 토큰이 들어있다.
        // 헤더 중 Authorization 시작하는 키가 없거나, Bearer 시작하는 값이 아니라면
        if (token != null && token.startsWith("Bearer ")) {
            try {
                DecodedJWT decodedJWT = jwtUtil.verifyToken(token);
                String owner = decodedJWT.getClaim("owner").asString();
                String role = decodedJWT.getClaim("role").asString();
                // principal : id, credentials : 비밀번호 : 의미없지않나..왜쓰는거지
                // 아래가 핵심 : 없으면 인증이 되지 않는다.
                // owner와 role을 어떤식으로 컨트롤러에 넘겨줄지 고민이 필요함
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(new CustomPrincipal(owner, role), null, null);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } catch (Exception e) {
                System.out.println("에러 발생! : "+e);
            }
        }
        chain.doFilter(request, response); // 모든 과정이 끝났으므로 다음 필터 체인 호출
    }
}
