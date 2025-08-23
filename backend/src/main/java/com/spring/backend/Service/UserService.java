package com.spring.backend.Service;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.backend.Entity.UserEntity;
import com.spring.backend.Exception.UserException;
import com.spring.backend.Model.LoginModule;
import com.spring.backend.Model.RegisterModule;
import com.spring.backend.Repo.UserRepo;
import com.spring.backend.interfaces.UserInterfaces;

@Service
public class UserService implements UserInterfaces{

    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private UserRepo userRepo;

    @Override
    public UserEntity RegisterService(RegisterModule registerModule) {
        UserEntity email = userRepo.findByEmail(registerModule.getEmail());
        UserEntity name = userRepo.findByName(registerModule.getName());

        if (email != null && !email.isChecked()) {
            return email;
        }else if (email != null) {
            throw new UserException("this email id alreday registered !");
        }else if(name != null){
            throw new UserException("this user name is already taken by another user");
        }else if(registerModule.getName().length() < 3){
            throw new UserException("user name length should be more than 3 chars");
        }else if(registerModule.getPass().length() < 8){
            throw new UserException("user password length should be more than 7 chars");
        }else{
            UserEntity ue = new UserEntity(null, registerModule.getName(), registerModule.getEmail(),passwordEncoder.encode( registerModule.getPass()), LocalDateTime.now(), LocalDateTime.now(), false,5,"http://localhost:8080/api/img.png");
            return userRepo.save(ue);
        }
    }

    @Override
    public UserEntity LoginService(LoginModule loginModule) {
        UserEntity login = userRepo.findByEmail(loginModule.getEmail());
        if (login != null && login.isChecked() && passwordEncoder.matches(loginModule.getPass(), login.getPass())) {
            login.setLogin(LocalDateTime.now());
            return userRepo.save(login);
        }
        throw new UserException("invalid user email id or password !");
    }
    
}
