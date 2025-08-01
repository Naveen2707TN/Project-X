package com.spring.users.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.users.Exception.UserException;
import com.spring.users.Module.LoginModule;
import com.spring.users.Token.JwtToken;
import com.spring.users.entity.UserEntity;
import com.spring.users.service.MailService;
import com.spring.users.service.UserService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/public")
public class PublicUserController {

    @Autowired private UserService userService;
    @Autowired private JwtToken jwtToken;
    @Autowired private MailService mailService;
    
    @PostMapping("/v1/reg")
    public ResponseEntity<?> UserRegister(@RequestBody UserEntity userEntity){
        try {
            UserEntity users = userService.UserRegister(userEntity);
            if (users != null) {
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userEntity.getEmail(), userEntity.getPass(), new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(auth);
                mailService.SendMail(userEntity);
                return ResponseEntity.ok().body("success");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error : "+e.getMessage());
        }
        return ResponseEntity.badRequest().body("failed !");
    }

    @PostMapping("/v1/log")
    public ResponseEntity<?> UserLogin(@RequestBody LoginModule userEntity, HttpServletResponse response){
        try {
            UserEntity users = userService.UserLogin(userEntity);
            if (users != null) {
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userEntity.getEmail(), userEntity.getPass(), new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(auth);
                String Token = jwtToken.GenerateToken(users.getId(), users.getName());
                return ResponseEntity.ok().body("success : "+Token);
            }
        } catch (UserException e) {
            return ResponseEntity.badRequest().body("error : "+e.getMessage());
        }
        return ResponseEntity.badRequest().body("failed !");
    }

    @PostMapping("/v1/verify")
    public ResponseEntity<?> UserVerify(@RequestParam String Code){
        try {
            UserEntity users = userService.VerifyUser(Code);
            if (users != null) {
                String Token = jwtToken.GenerateToken(users.getId(), users.getName());
                return ResponseEntity.ok().body("success : "+Token);
            }
        } catch (UserException e) {
            return ResponseEntity.badRequest().body("error : "+e.getMessage());
        }
        return ResponseEntity.badRequest().body("failed !");
    }
}
