package com.spring.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.spring.backend.Entity.UserEntity;

import jakarta.transaction.Transactional;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long>{
    
    UserEntity findByEmail(String email);

    UserEntity findByName(String name);

    @Transactional
    @Modifying
    @Query(value = "Delete from users where email = :email", nativeQuery = true)
    void DeleteUser(String email);
}
