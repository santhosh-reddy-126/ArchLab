package com.arc.ArchLab.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.util.Date;

public class JwtUtils {

    private static final String SECRET =
            "hwalioehfawkhoi293qwlcsdbfjwbekj";

    private static final Long SIX_HOURS_MILLIS = (long) (6 * 60 * 60 * 1000);

    public static String generateToken(String userId, String username){
        return Jwts.builder().subject(userId).claim("username",username).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis()+SIX_HOURS_MILLIS)).signWith(Keys.hmacShaKeyFor(
                        SECRET.getBytes()),
                Jwts.SIG.HS256).compact();
    }

    public static Claims verify(String token){
        return Jwts.parser()
                .verifyWith(
                        Keys.hmacShaKeyFor(
                                SECRET.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
