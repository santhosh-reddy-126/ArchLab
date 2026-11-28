package com.arc.ArchLab.JWT;

import com.arc.ArchLab.utils.JwtUtils;
import io.dropwizard.auth.Authenticator;

import java.util.Optional;

public class JwtAuthenticator implements Authenticator<String, UserPrincipal> {

    @Override
    public Optional<UserPrincipal> authenticate(String token) {
        try {
            var claims = JwtUtils.verify(token);
            return Optional.of(new UserPrincipal(
                    claims.get("userId", String.class),
                    claims.getSubject()
            ));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }
}
