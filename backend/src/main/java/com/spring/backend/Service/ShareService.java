package com.spring.backend.Service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.backend.Entity.ShareEntity;
import com.spring.backend.Entity.UploadEntity;
import com.spring.backend.Entity.UserEntity;
import com.spring.backend.Exception.UserException;
import com.spring.backend.Repo.ShareRepo;
import com.spring.backend.Repo.UploadRepo;
import com.spring.backend.Repo.UserRepo;
import com.spring.backend.Token.JwtToken;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class ShareService {
    
    @Autowired private ShareRepo shareRepo;
    @Autowired private UserRepo userRepo;
    @Autowired private UploadRepo uploadRepo;
    @Autowired private JwtToken jwtToken;

    public ShareEntity ShareFile(int hours, Long userid, String email){
        String Token = GenerateToken();
        LocalDateTime time = LocalDateTime.now();
        ShareEntity shareEntity = new ShareEntity(null, userid, time.plusHours(hours), Token, email);
        return shareRepo.save(shareEntity);
    }

    public String GenerateLink(int hours, Long userid, HttpServletRequest request){
        String auth = request.getHeader("Authorization");
        String Token = auth.substring(7);
        String name = jwtToken.extractName(Token);
        UserEntity userEntity = userRepo.findByName(name);
        ShareEntity shareEntity = ShareFile(hours, userid, userEntity.getEmail());
        System.out.println(shareEntity.getExp());
        String url = "http://localhost:3000/share?Token="+shareEntity.getToken();
        return url;
    }

    public UploadEntity ExposeLink(String Token){
        ShareEntity token = shareRepo.findByToken(Token);
        System.out.println(token.getToken());
        if (token != null) {
            System.out.println("Token");
            if(!token.getExp().isBefore(LocalDateTime.now())){
                UploadEntity uploadEntity = uploadRepo.FindId(token.getUser_id());
                if (uploadEntity != null) {
                    return uploadEntity;
                }else{
                    throw new UserException("invalid link");
                }
            }
        }
        throw new UserException("invalid token");
    }

    public String GenerateToken(){
        String Token = "MmNnBbVvCcXxZzLlKkJjHhGgFfDdSsAaQqWwEeRrTtYyUuIiOoPp";
        char[] arr = Token.toCharArray();
        int len = arr.length;
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < 22; i++) {
            int value = random.nextInt(len);
            sb.append(arr[value]);
        }
        return sb.toString();
    }
    
}
