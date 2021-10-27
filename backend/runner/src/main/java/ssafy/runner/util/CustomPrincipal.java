package ssafy.runner.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter @ToString
@AllArgsConstructor
public class CustomPrincipal {
    private String email;
    private String role;
}
