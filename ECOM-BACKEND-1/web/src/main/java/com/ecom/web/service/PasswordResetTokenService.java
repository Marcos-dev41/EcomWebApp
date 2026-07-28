package com.ecom.web.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecom.web.model.User;
import com.ecom.web.model.PasswordResetToken;
import com.ecom.web.repository.LoginRepo;
import com.ecom.web.repository.PasswordResetTokenRepo;

@Service
public class PasswordResetTokenService {
    @Autowired
    private PasswordResetTokenRepo passwordResetTokenRepo;

    @Autowired
    private LoginRepo loginRepo;

    @Autowired
    private PasswordEncoder encoder;
    
    public boolean resetPassword(String token, String newPassword) {
    PasswordResetToken resetToken = passwordResetTokenRepo.findByToken(token).orElse(null);

    if (resetToken == null) {
        return false; 
    }

    if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
        passwordResetTokenRepo.delete(resetToken); 
        return false; 
    }

    User user = resetToken.getUser();
    System.out.println("new password is: " + newPassword);
    user.setUserPassword(encoder.encode(newPassword));
    loginRepo.save(user);
    

    passwordResetTokenRepo.delete(resetToken);
    return true;
}
}
