package com.spring.backend.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ShareEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    public Long userid;

    @Column(nullable = false)
    private LocalDateTime exp;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private String email;


    public ShareEntity() {
    }

    public ShareEntity(Long id, Long user_id, LocalDateTime exp, String token, String email) {
        this.id = id;
        this.userid = user_id;
        this.exp = exp;
        this.token = token;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser_id() {
        return userid;
    }

    public void setUser_id(Long user_id) {
        this.userid = user_id;
    }

    public LocalDateTime getExp() {
        return exp;
    }

    public void setExp(LocalDateTime exp) {
        this.exp = exp;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    
}
