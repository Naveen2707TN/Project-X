package com.spring.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.spring.backend.Entity.OtpEntity;
import com.spring.backend.Entity.ResetEntity;
import com.spring.backend.Entity.UserEntity;
import com.spring.backend.interfaces.MailInterfaces;

@Service
public class MailService implements MailInterfaces{

    @Autowired JavaMailSender javaMailSender;
    @Autowired OtpServie otpServie;
    @Autowired ResetService resetService;

    @Override
    public String SendMail(UserEntity userEntity) {
        SimpleMailMessage message = new SimpleMailMessage();
        OtpEntity otp = otpServie.generateOtp(userEntity);
        int Code = otp.getOtp();
        int last = 0, temp = Code;
        while (temp != 0) {
            int rem = temp % 10;
            last = rem;
            temp /= 10;
        }
        message.setTo(userEntity.getEmail());
        message.setSubject("your Otp Code is : " + last + "XXXXX");
        message.setText("Dear User [" + userEntity.getName() + "] \n" + "Your Otp Code is **" + Code + "**\n" + "this otp valid till 5 minutes if your never request code please ignore this message");
        javaMailSender.send(message);
        return otp.getToken();
    }

    @Override
    public void SendMailRsetPassword(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        ResetEntity reset = resetService.resetPassword(email);
        message.setTo(email);
        message.setSubject("we have a reset link");
        String Link = "http://localhost:3000/reset?token="+reset.getToken();
        message.setText("Dear User [" + email + "] \n" + "Your Request for rest password is accepted" + "this link valid till 5 minutes if your never request link please ignore this message \n" + Link);
        javaMailSender.send(message);
    }
    
}
