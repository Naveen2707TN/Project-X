package com.spring.users.Component;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.spring.users.Exception.UserException;
import com.spring.users.entity.UserEntity;
import com.spring.users.repo.UserRepo;

@Component
public class CustomUserDetails implements UserDetailsService{

    @Autowired private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepo.findByName(username);
        if (user == null) {
            throw new UserException("user name not found Exception : " + username);
        }
        return new User(user.getEmail(), user.getPass(), new ArrayList<>());
    }
    
}
