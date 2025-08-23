package com.spring.backend.Token;

import java.util.Date;

import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtToken {
    
    private static final String token = "ftsa98odusjhbvfsax6767i8jnwhqgiyewq4567yg2v1-0pojhb";

    private SecretKey KeyGenerate(){
        return Keys.hmacShaKeyFor(token.getBytes());
    }

    public String GenerateToken(String name){
        return Jwts.builder()
                    .signWith(KeyGenerate())
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + 32L * 24 * 60 * 60 * 1000 ))
                    .subject(name)
                    .compact();
    }

    public String extractName(String Token){
        return Jwts.parser()
                    .verifyWith(KeyGenerate())
                    .build()
                    .parseSignedClaims(Token)
                    .getPayload()
                    .getSubject();
    }

    public boolean isExp(String Token){
        Date date = Jwts.parser()
                        .verifyWith(KeyGenerate())
                        .build()
                        .parseSignedClaims(Token)
                        .getPayload()
                        .getExpiration();
        return date.before(new Date());
    }

    public boolean isVerify(String Token, String name){
        String user = extractName(Token);
        return user.equals(name) && !isExp(Token);
    }
}