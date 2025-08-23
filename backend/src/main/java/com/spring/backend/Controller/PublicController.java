package com.spring.backend.Controller;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.backend.Entity.ShareEntity;
import com.spring.backend.Entity.UploadEntity;
import com.spring.backend.Entity.UserEntity;
import com.spring.backend.Model.LoginModule;
import com.spring.backend.Model.RegisterModule;
import com.spring.backend.Model.ResetModule;
import com.spring.backend.Repo.ShareRepo;
import com.spring.backend.Repo.UploadRepo;
import com.spring.backend.Service.MailService;
import com.spring.backend.Service.OtpServie;
import com.spring.backend.Service.ResetService;
import com.spring.backend.Service.ShareService;
import com.spring.backend.Service.UserService;
import com.spring.backend.Token.JwtToken;

@RestController
@RequestMapping("/public")
public class PublicController {
 
    @Autowired private UserService userService;
    @Autowired private MailService mailService;
    @Autowired private OtpServie otpServie;
    @Autowired private JwtToken jwtToken;
    @Autowired private ShareService shareService;
    @Autowired private ResetService reset;
    @Autowired private ShareRepo shareRepo;
    @Autowired private UploadRepo uploadRepo;

    @PostMapping("/api/v1/reg")
    public ResponseEntity<?> Register(@RequestBody RegisterModule registerModule){
        try {
            UserEntity users = userService.RegisterService(registerModule);
            if (users != null) {
                String Token = mailService.SendMail(users);
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(registerModule.getEmail(), registerModule.getPass(), new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authToken);
                return ResponseEntity.ok().body(Token);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error : "+e.getMessage());
        }
        return ResponseEntity.badRequest().body("failed !");
    }

    @PostMapping("/api/v1/log")
    public ResponseEntity<?> Login(@RequestBody LoginModule loginModule){
        try {
            UserEntity users = userService.LoginService(loginModule);
            if (users != null) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginModule.getEmail(), loginModule.getPass(), new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authToken);
                String Token = jwtToken.GenerateToken(users.getName());
                return ResponseEntity.ok().body(Token);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error : "+e.getMessage());
        }
        return ResponseEntity.badRequest().body("failed !");
    }

    @PostMapping("/api/v1/ver")
    public ResponseEntity<?> Verify(@RequestParam String token, @RequestParam int Code) {
        try {
            UserEntity users = otpServie.VerifyUser(Code, token);
            if (users != null) {
                String Token = jwtToken.GenerateToken(users.getName());
                return ResponseEntity.ok().body(Token);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error : " + e.getMessage());
        }
        return ResponseEntity.badRequest().body("error : failed !");
    }

    @GetMapping("/api/v1/verify")
    public ResponseEntity<?> VerifyFile(@RequestParam String Token){
        try {
            UploadEntity data = shareService.ExposeLink(Token);
            return ResponseEntity.ok().body(data);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("err : " + e.getMessage());
        }
    }

    @PostMapping("/api/v1/rest-link")
    public ResponseEntity<?> RestLink(@RequestParam String email){
        try {
            mailService.SendMailRsetPassword(email);
            return ResponseEntity.ok().body("send");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("err : " + e.getMessage());
        }
    }

    @PostMapping("/api/v1/verify-user")
    public ResponseEntity<?> ResetPass(@RequestBody ResetModule resetModule){
        try {
            int res = reset.VerifyPassowrd(resetModule.getToken(), resetModule);
            if (res == 1) {
                return ResponseEntity.ok().body("password Reseted");
            }else{
                return ResponseEntity.badRequest().body("failed !");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("err : " +e.getMessage());
        }
    }

    @GetMapping("/api/download")
    public ResponseEntity<?> Download(@RequestParam String token){
        System.out.println("working....");
        ShareEntity share = shareRepo.findByToken(token);
        UploadEntity upload = uploadRepo.FindId(share.getUser_id());
        if (upload != null && !share.getExp().isBefore(LocalDateTime.now())) {
            String name = upload.getFileName();
            return ResponseEntity.ok().contentType(MediaType.parseMediaType(upload.getFileType())).header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+name+"\"").body(upload.getfile());
        }
        return ResponseEntity.badRequest().body("link exp");
    }
    
}
