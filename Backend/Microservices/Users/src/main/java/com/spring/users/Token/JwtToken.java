package com.spring.users.Token;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtToken {

    private SecretKey KeyGenerate(){
        String SECRETKEY = "hdat98u23uu62r656#$%%*ws yqips-+=[]";
        return Keys.hmacShaKeyFor(SECRETKEY.getBytes());
    }

    public String GenerateToken(Long id, String Name){
        return Jwts.builder()
                    .subject(Name)
                    .claim("user id", id)
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + 1 * 60 * 60 * 1000))
                    .signWith(KeyGenerate())
                    .compact();
    }

    public String RefreshToken(Long id, String Name){
        return Jwts.builder()
                    .subject(Name)
                    .claim("user id", id)
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + 30 * 24 * 60 * 60 * 1000))
                    .signWith(KeyGenerate())
                    .compact();
    }
    
}