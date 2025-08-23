package com.spring.backend.interfaces;

import com.spring.backend.Entity.UserEntity;

public interface MailInterfaces {
    
    String SendMail(UserEntity userEntity);

    void SendMailRsetPassword(String email);
}
