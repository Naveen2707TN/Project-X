package com.spring.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.backend.Entity.OtpEntity;

@Repository
public interface OtpRepo extends JpaRepository<OtpEntity, Long> {
    
    OtpEntity findByToken(String Token);
}
