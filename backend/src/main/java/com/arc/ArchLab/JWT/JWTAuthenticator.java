package com.arc.ArchLab.JWT;

import com.arc.ArchLab.utils.JwtUtils;
import io.dropwizard.auth.Authenticator;
import io.jsonwebtoken.Claims;

import java.util.Optional;

public class JWTAuthenticator implements Authenticator<String, UserPrincipal> {
    @Override
    public Optional<UserPrincipal> authenticate(String token) {
        try {
            Claims claims = JwtUtils.verify(token);

            return Optional.of(
                    new UserPrincipal(
                            claims.get("userId", String.class),
                            claims.getSubject()
                    )
            );
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}