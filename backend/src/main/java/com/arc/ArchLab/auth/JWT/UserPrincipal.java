package com.arc.ArchLab.auth.JWT;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.security.Principal;

@Getter
@AllArgsConstructor
public class UserPrincipal implements Principal {

    private final String userId;
    private final String username;

    @Override
    public String getName() {
        return username;
    }
}