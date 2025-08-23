package com.spring.backend.Model;

public class ResetModule {
    
    String pass;

    String newPass;

    String Token;

    public ResetModule(String pass, String newPass, String Token) {
        this.pass = pass;
        this.newPass = newPass;
        this.Token = Token;
    }

    

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getNewPass() {
        return newPass;
    }

    public void setNewPass(String newPass) {
        this.newPass = newPass;
    }



    public String getToken() {
        return Token;
    }



    public void setToken(String token) {
        Token = token;
    }

    
}
