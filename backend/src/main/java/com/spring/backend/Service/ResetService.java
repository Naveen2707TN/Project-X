package com.spring.backend.Service;

import java.time.LocalTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.backend.Repo.UserRepo;
import com.spring.backend.Entity.ResetEntity;
import com.spring.backend.Entity.UserEntity;
import com.spring.backend.Exception.UserException;
import com.spring.backend.Model.ResetModule;
import com.spring.backend.Repo.ResetRepo;

@Service
public class ResetService {
    
    @Autowired private UserRepo userRepo;
    @Autowired private ResetRepo resetRepo;
    @Autowired private PasswordEncoder passwordEncoder;

    public ResetEntity resetPassword(String email){
        UserEntity users = userRepo.findByEmail(email);
        if (users != null) {
            String Token = GenerateToken();
            ResetEntity reset = new ResetEntity(null, email , Token, LocalTime.now().plusMinutes(5));
            return resetRepo.save(reset);
        }
        throw new UserException("invalid emaid id");
    }

    public int VerifyPassowrd(String Token, ResetModule resetModule){
        ResetEntity reset = resetRepo.findByToken(Token);
        if (reset != null && !reset.getExp().isBefore(LocalTime.now())) {
            UserEntity users = userRepo.findByEmail(reset.getEmail());
            if (users != null) {
                if (resetModule.getPass().length() < 7 && resetModule.getNewPass().length() < 7) {
                    throw new UserException("the user password length should be more than 7 char");
                }
                String pass = resetModule.getPass();
                String newPass = resetModule.getNewPass();
                if (pass.equals(newPass)) {
                    users.setPass(passwordEncoder.encode(newPass));
                    userRepo.save(users);
                    int ans = resetRepo.deleteToken(Token);
                    return ans;
                }else{
                    throw new UserException("password Mismatch");
                }
            }
           throw new UserException("Token Experied !");
        }
        throw new UserException("invalid Token !");
    }

    public String GenerateToken() {
        String Token = "Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0KkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
        char[] arr = Token.toCharArray();
        int len = arr.length;
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < 32; i++) {
            char value = arr[random.nextInt(len)];
            sb.append(value);
        }
        return sb.toString();
    } 
}

