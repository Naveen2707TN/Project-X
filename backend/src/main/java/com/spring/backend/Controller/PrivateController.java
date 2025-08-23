package com.spring.backend.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.spring.backend.Entity.UploadEntity;
import com.spring.backend.Entity.UserEntity;
import com.spring.backend.Model.StorageModule;
import com.spring.backend.Service.MailService;
import com.spring.backend.Service.ShareService;
import com.spring.backend.Service.UploadService;
import com.spring.backend.Token.JwtToken;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/private")
public class PrivateController {

    @Autowired private JwtToken jwtToken;
    @Autowired private UploadService uService;
    @Autowired private ShareService shareService;
    @Autowired private MailService mailService;

    @GetMapping("/api/v1/name")
    public ResponseEntity<?> getName(HttpServletRequest request){
        String auth = request.getHeader("Authorization");
        String Token = auth.substring(7);
        String name = jwtToken.extractName(Token);
        return ResponseEntity.ok().body(name);
    }

    @PostMapping("/api/v1/upload")
    public ResponseEntity<?> Upload(@RequestParam MultipartFile file, HttpServletRequest request){
        try {
            UploadEntity entity = uService.upladFile(file, request);
            return ResponseEntity.ok().body(entity);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("err : " + e.getMessage());
        }
    }
    
    @GetMapping("/api/v1/list-files")
    public ResponseEntity<?> ListFiles(HttpServletRequest request){
        List<UploadEntity> list = uService.listFiles(request);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/api/v1/files")
    public ResponseEntity<?> files(@RequestParam Long id){
        UploadEntity files = uService.findById(id);
        return ResponseEntity.ok().body(files);
    }

    @DeleteMapping("/api/v1/delete")
    public ResponseEntity<?> Delete(@RequestParam Long id, HttpServletRequest request){
        int value = uService.DeleteFiles(id, request);
        if (value == 1) {
            return ResponseEntity.ok().body("file Deleted !");
        }else{
            return ResponseEntity.badRequest().body("file not found");
        }        
    }

    @GetMapping("/api/v1/storage")
    public ResponseEntity<?> Storage(HttpServletRequest request){
        String value = uService.GetStorage(request);
        return ResponseEntity.ok().body(value);
    }

    @GetMapping("/api/v1/data")
    public ResponseEntity<?> Group(HttpServletRequest request){
        ArrayList<StorageModule> list = uService.GroupFiles(request);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/api/v1/users")
    public ResponseEntity<?> UserDetails(HttpServletRequest request){
        UserEntity users = uService.getDetails(request);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/api/v1/share")
    public ResponseEntity<?> ShareFile(HttpServletRequest request, @RequestParam Long id, @RequestParam int hours){
        String Link = shareService.GenerateLink(hours, id, request);
        return ResponseEntity.ok().body(Link);
    }

    @GetMapping("/api/v1/download")
    public ResponseEntity<?> DownloadFile(@RequestParam Long id)throws Exception{
        UploadEntity path = uService.DownloadLink(id);
        String name = path.getFileName();
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(path.getFileType())).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + name + "\"").body(path.getfile());
    }

    @DeleteMapping("/api/v1/delete-acc")
    public ResponseEntity<?> delete(HttpServletRequest request){
        uService.DeleteAccount(request);
        return ResponseEntity.ok().body("Account deleted !");
    }

    @GetMapping("/api/v1/reset-acc")
    public ResponseEntity<?> ResetPassword(HttpServletRequest request){
        try {
            String email = uService.SnedMail(request);
            mailService.SendMailRsetPassword(email);
            return ResponseEntity.ok().body("Mail Sended");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("err : " + e.getMessage());
        }
    }
}