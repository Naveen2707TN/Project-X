package com.spring.backend.interfaces;

import com.spring.backend.Entity.UserEntity;
import com.spring.backend.Model.LoginModule;
import com.spring.backend.Model.RegisterModule;

public interface UserInterfaces {
    
    UserEntity RegisterService(RegisterModule registerModule);

    UserEntity LoginService(LoginModule loginModule);
}
