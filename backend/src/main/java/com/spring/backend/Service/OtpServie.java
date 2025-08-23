package com.spring.backend.Service;

import java.time.LocalTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.backend.Entity.OtpEntity;
import com.spring.backend.Entity.UserEntity;
import com.spring.backend.Exception.UserException;
import com.spring.backend.Repo.OtpRepo;
import com.spring.backend.Repo.UserRepo;
import com.spring.backend.interfaces.OtpInterfaces;

@Service
public class OtpServie implements OtpInterfaces{

    @Autowired private OtpRepo otpRepo;
    @Autowired private UserRepo userRepo;

    @Override
    public OtpEntity generateOtp(UserEntity userEntity) {
        int Code = (int) ( 78919  + Math.random() * 99999);
        String Token = GenerateToken();
        OtpEntity otp= new OtpEntity(null, userEntity.getEmail(), Code, Token, LocalTime.now().plusMinutes(5));
        return otpRepo.save(otp);
    }

    @Override
    public String GenerateToken() {
        String Token = "Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0KkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
        char[] arr = Token.toCharArray();
        int len = arr.length;
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < 20; i++) {
            char value = arr[random.nextInt(len)];
            sb.append(value);
        }
        return sb.toString();
    }

    @Override
    public UserEntity VerifyUser(int Code, String Token) {
        OtpEntity entity = otpRepo.findByToken(Token);
        if (entity != null && entity.getOtp() == Code  && !entity.getExp().isBefore(LocalTime.now())) {
            UserEntity user = userRepo.findByEmail(entity.getEmail());
            user.setChecked(true);
            return userRepo.save(user);
        }
        throw new UserException("invalid Otp Code entered !");
    }
    
}
