package com.spring.users.interfaces;

import com.spring.users.Module.LoginModule;
import com.spring.users.entity.UserEntity;

public interface UserInterfaces {

	public UserEntity UserRegister(UserEntity userEntity);
	
	public UserEntity UserLogin(LoginModule userEntity);

	public String OTPCode();

	public UserEntity VerifyUser(String Code);
}
