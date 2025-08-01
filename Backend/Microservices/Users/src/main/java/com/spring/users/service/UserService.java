package com.spring.users.service;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.users.Exception.UserException;
import com.spring.users.Module.LoginModule;
import com.spring.users.entity.UserEntity;
import com.spring.users.interfaces.UserInterfaces;
import com.spring.users.repo.UserRepo;

@Service
public class UserService implements UserInterfaces{

	@Autowired private UserRepo userRepo;

	private UserEntity ue;

	private String Code;
	
	@Override
	public UserEntity UserRegister(UserEntity userEntity) {
		UserEntity emailEntity = userRepo.findByEmail(userEntity.getEmail());
		UserEntity namEntity = userRepo.findByName(userEntity.getName());
		if (emailEntity != null) {
			throw new UserException("user email id already register");
		}else if(namEntity != null) {
			throw new UserException("user name already taken by another user");
		}else if(userEntity.getName().length() < 3){
			throw new UserException("user name should be more than 3 char");
		}else if(userEntity.getPass().length() < 7){
			throw new UserException("user password should be more than 7 char");
		}else if(emailEntity == null && namEntity == null){
			ue = new UserEntity(null, userEntity.getName(), userEntity.getEmail(), userEntity.getPass(), false, new Date(), "http://localhost:8080/hello?img=local.png");
			return ue;
		}
		return null;
	}

	@Override
	public UserEntity UserLogin(LoginModule userEntity) {
		UserEntity users = userRepo.findByEmail(userEntity.getEmail());
		if(users != null && userEntity.getPass().equals(users.getPass()) && users.isIscheck()){
			return users;
		}
		throw new UserException("invalid user email id or password !");
	}

	public String OTPCode(){
		Code = UUID.randomUUID().toString().substring(0, 6);
		System.out.println(Code);
		return Code;
	}

	public UserEntity VerifyUser(String code){
		if (Code.equals(code)) {
			System.out.println(Code);
			ue.setIscheck(true);
			ue.setCreatedate(new Date());
			return userRepo.save(ue);
		}
		throw new UserException("invalid OTP Code entered");
	}

}
