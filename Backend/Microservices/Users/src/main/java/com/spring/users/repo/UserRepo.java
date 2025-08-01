package com.spring.users.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.users.entity.UserEntity;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long>{

	UserEntity findByEmail(String email);
	
	UserEntity findByName(String name);
}
