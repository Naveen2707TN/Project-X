package com.spring.backend.Token;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.spring.backend.Component.CustomUserDetails;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuth extends OncePerRequestFilter{

    @Autowired private JwtToken jwtToken;
    @Autowired private CustomUserDetails customUserDetails;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        if (path.startsWith("/public/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String name = null;
        String Token = null;
        String auth = request.getHeader("Authorization");
        if (auth != null && auth.startsWith("Bearer ")) {
            Token = auth.substring(7);
            try {
                name = jwtToken.extractName(Token);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if(name != null && SecurityContextHolder.getContext().getAuthentication() == null){
            if (jwtToken.isVerify(Token, name)) {
                UserDetails ud = customUserDetails.loadUserByUsername(name);
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(ud.getUsername(), null, ud.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
