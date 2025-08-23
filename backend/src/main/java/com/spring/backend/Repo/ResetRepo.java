package com.spring.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.spring.backend.Entity.ResetEntity;

import jakarta.transaction.Transactional;

@Repository
public interface ResetRepo extends JpaRepository<ResetEntity, Long> {
    
    ResetEntity findByToken(String Token);
    @Transactional
    @Modifying
    @Query(value = "Delete from reset where token = :Token", nativeQuery = true)
    int deleteToken(String Token);
}
