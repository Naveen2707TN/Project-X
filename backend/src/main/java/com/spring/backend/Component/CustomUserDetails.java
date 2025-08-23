package com.spring.backend.Component;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.spring.backend.Entity.UserEntity;
import com.spring.backend.Exception.UserException;
import com.spring.backend.Repo.UserRepo;

@Component
public class CustomUserDetails implements UserDetailsService{

    @Autowired private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity ue = userRepo.findByName(username);
        if (ue == null) {
            throw new UserException("invalid user name");
        }
        return new User(ue.getEmail(), ue.getPass(), new ArrayList<>());
    }
    
}
