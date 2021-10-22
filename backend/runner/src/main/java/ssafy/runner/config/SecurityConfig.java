package ssafy.runner.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import ssafy.runner.util.JwtAuthenticationFilter;
import ssafy.runner.util.JwtUtil;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtUtil jwtUtil;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
            httpBasic().disable() //httpBasic은 security 기본 인증 화면을 보여주는것 -> 끈다
            .csrf().disable() // csrf 토큰
            .cors().disable() // cors 정책
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // rest이므로 세션 무상태 설정
            .and()
            .addFilter(new JwtAuthenticationFilter(authenticationManager(), jwtUtil)) // 필터 추가
            .authorizeRequests()
            .antMatchers("/api/test/login").permitAll() // jwt 미검사 패턴
            .antMatchers("/api/test/innerpage").authenticated();
//            .anyRequest().authenticated(); // 그 외 경로는 인증 필요
    }

}