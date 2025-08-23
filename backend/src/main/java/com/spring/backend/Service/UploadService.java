package com.spring.backend.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.backend.Entity.UploadEntity;
import com.spring.backend.Entity.UserEntity;
import com.spring.backend.Exception.UserException;
import com.spring.backend.Model.StorageModule;
import com.spring.backend.Repo.UploadRepo;
import com.spring.backend.Repo.UserRepo;
import com.spring.backend.Token.JwtToken;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class UploadService {

    @Autowired JwtToken jwtToken;
    @Autowired private UserRepo userRepo;
    @Autowired private UploadRepo uploadRepo;
    
    public String getEmail(HttpServletRequest request){
        String auth = request.getHeader("Authorization");
        String Token = auth.substring(7);
        String name = jwtToken.extractName(Token);
        UserEntity users = userRepo.findByName(name);
        return users.getEmail();
    }

    public UserEntity getDetails(HttpServletRequest request){
        String auth = request.getHeader("Authorization");
        String Token = auth.substring(7);
        String name = jwtToken.extractName(Token);
        UserEntity entity = userRepo.findByName(name);
        return entity;
    }

    public UploadEntity upladFile(MultipartFile file, HttpServletRequest request) throws IOException{
        String email = getEmail(request);
        UserEntity entity = userRepo.findByEmail(email);
        String fileSize = GetStorage(request);
        double add = file.getSize() / (1024.0 * 1024.0);
        double space = Double.parseDouble(fileSize.replace("Mb", "").trim()) + add;
        if (entity.getCredits() > 0 && space <= 100.00) {
            entity.setCredits(entity.getCredits() -1);
            userRepo.save(entity);
            String size = getSize(file);
            UploadEntity uploadEntity = new UploadEntity(null, file.getOriginalFilename(), file.getContentType(), size, file.getBytes(), email, LocalDate.now());
            return uploadRepo.save(uploadEntity);   
        }else{
            throw new UserException("invalid credits");
        }
    }

    public List<UploadEntity> listFiles(HttpServletRequest request){
        String email = getEmail(request);
        List<UploadEntity> listFiles = uploadRepo.ListFiles(email);
        return listFiles;
    }

    public UploadEntity findById(Long id){
        UploadEntity files = uploadRepo.FindId(id);
        return files;
    }

    public int DeleteFiles(Long id, HttpServletRequest request){
        int value = uploadRepo.DeleteFiles(id);
        String auth = request.getHeader("Authorization");
        String Token = auth.substring(7);
        String name = jwtToken.extractName(Token);
        UserEntity users = userRepo.findByName(name);
        if(users != null){
            int credits = users.getCredits();
            users.setCredits(credits + 1);
            userRepo.save(users);
            return value;
        }
        throw new UserException("inavlid section");
    }

    public ArrayList<StorageModule> GroupFiles(HttpServletRequest request) {
        List<UploadEntity> list = listFiles(request);
        ArrayList<StorageModule> arrayList = new ArrayList<>();
        for (UploadEntity uploadEntity : list) {
            double ans = 0.0;
            int count = 0;
            String type = uploadEntity.getFileType();
            for (UploadEntity up : list) {
                if (type.equals(up.getFileType())) {
                    count++;
                    if (up.getFileSize().endsWith("Mb")){
                        ans += Double.parseDouble(up.getFileSize().replace("Mb", "").trim()) * (1024.0 * 1024.0); 
                    }else { 
                        ans += Double.parseDouble(up.getFileSize().replace("Kb", "").trim()) * (1024.0);
                    }
                }
            }
            double siz = ans / (1024.0 * 1024.0);
            String Size = String.format("%.02f Mb", siz);
            StorageModule st = new StorageModule(type, Size, count);
            boolean alreadyAdded = false;
            for (StorageModule sm : arrayList) {
                if (sm.getType().equals(type)) {
                    alreadyAdded = true;
                    break;
                }
            }
            if (!alreadyAdded) {
                arrayList.add(st);
            } 
        } 
        return arrayList;
    }

    public String getSize(MultipartFile file){
        double size = file.getSize();
        if (size <= 1048576) {
            double kb = size / 1024.0;
            String value = String.format("%.2f Kb", kb);
            return value;
        }else{
            double mb = size /(1024.0 * 1024.0);
            String value = String.format("%.2f Mb", mb);
            return value;
        }
    }

    public String GetStorage(HttpServletRequest request){
        List<UploadEntity> list = listFiles(request);
        ArrayList<String> arrayList = new ArrayList<>();
        for (UploadEntity uploadEntity : list) {
            arrayList.add(uploadEntity.getFileSize());
        }

        ArrayList<Double> lists = new ArrayList<>();
        for (String name : arrayList) {
            if (name.endsWith("Mb")) {
                String value = name.replace("Mb", "");
                Double size = Double.parseDouble(value);
                double val = size * (1024.0 * 1024.0);
                lists.add(val);
            }else if (name.endsWith("Kb")) {
                String value = name.replace("Kb", "");
                Double size = Double.parseDouble(value);
                double val = size * (1024.0);
                lists.add(val); 
            }
        }
        double ans = 0.0;
        for (Double doub : lists) {
            ans += doub;
        }
        double Mb = ans / (1024.0 * 1024.0);
        return String.format("%.2f Mb", Mb);
    }

    public UploadEntity DownloadLink(Long id){
        UploadEntity upload = uploadRepo.FindId(id);
        return upload;
    }

    public void DeleteAccount(HttpServletRequest request){
        String auth = request.getHeader("Authorization");
        String Token = auth.substring(7);
        String name = jwtToken.extractName(Token);
        UserEntity user = userRepo.findByName(name);
        List<UploadEntity> list = listFiles(request);
        for (UploadEntity uploadEntity : list) {
            uploadRepo.DeleteFiles(uploadEntity.getId());
        }
        userRepo.DeleteUser(user.getEmail());
    }

    public String SnedMail(HttpServletRequest request){
        String email = getEmail(request);
        return email;
    }
}
