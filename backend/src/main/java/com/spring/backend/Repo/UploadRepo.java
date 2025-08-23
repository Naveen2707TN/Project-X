package com.spring.backend.Repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.spring.backend.Entity.UploadEntity;

import jakarta.transaction.Transactional;

@Repository
public interface UploadRepo extends JpaRepository<UploadEntity, Long>{

    @Query(value = "Select * from files where email = :email", nativeQuery = true)
    List<UploadEntity> ListFiles(String email);

    @Query(value = "Select * from files where id = :id", nativeQuery = true)
    UploadEntity FindId(Long id);

    @Transactional
    @Modifying
    @Query(value = "Delete from files where id = :id", nativeQuery = true)
    int DeleteFiles(Long id);

}