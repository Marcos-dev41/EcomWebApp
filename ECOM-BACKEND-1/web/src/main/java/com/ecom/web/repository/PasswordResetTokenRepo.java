package com.ecom.web.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecom.web.model.PasswordResetToken;

public interface PasswordResetTokenRepo extends JpaRepository<PasswordResetToken,Integer> {
    Optional <PasswordResetToken> findByToken(String token);    
} 