package com.spring.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.backend.Entity.ShareEntity;

@Repository
public interface ShareRepo extends JpaRepository<ShareEntity, Long>{
    
    ShareEntity findByToken(String Token);

    ShareEntity findByUserid(Long id);
}
