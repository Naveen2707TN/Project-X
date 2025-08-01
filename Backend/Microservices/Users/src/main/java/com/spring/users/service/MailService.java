package com.spring.users.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.spring.users.entity.UserEntity;
import com.spring.users.interfaces.MailInterfaces;

@Service
public class MailService implements MailInterfaces {

    @Autowired private JavaMailSender javaMailSender;
    @Autowired private UserService userService;

    @Override
    public void SendMail(UserEntity userEntity) {
        String OTP = userService.OTPCode();
        System.out.println( "mail OTP : " + OTP);
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(userEntity.getEmail());
        char Temp = OTP.charAt(0);
        simpleMailMessage.setSubject("Your OTP Code is "+ Temp + "xxxxx");
        simpleMailMessage.setText("Dear User [ " + userEntity.getName() + "] \n" + "Your OTP Code is ** "+ OTP + " ** \n" + "if you did not request this code please ignore this message");
        javaMailSender.send(simpleMailMessage);
    }
    
}
