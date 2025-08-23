package com.spring.backend.interfaces;

import com.spring.backend.Entity.OtpEntity;
import com.spring.backend.Entity.UserEntity;

public interface OtpInterfaces {
    
    OtpEntity generateOtp(UserEntity userEntity);

    String GenerateToken();

    UserEntity VerifyUser(int Code, String Token);
}
