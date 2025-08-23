package com.spring.backend.Entity;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "otp")
public class OtpEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private int otp;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalTime exp;

    public OtpEntity() {
    }

    public OtpEntity(Long id, String email, int otp, String token, LocalTime exp) {
        this.id = id;
        this.email = email;
        this.otp = otp;
        this.token = token;
        this.exp = exp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getOtp() {
        return otp;
    }

    public void setOtp(int otp) {
        this.otp = otp;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalTime getExp() {
        return exp;
    }

    public void setExp(LocalTime exp) {
        this.exp = exp;
    }

    
}
