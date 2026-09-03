package com.ecom.web.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecom.web.model.User;

import com.ecom.web.model.PasswordResetToken;
import com.ecom.web.repository.*;

@Service
public class AccountExistsService {
    @Autowired
    private LoginRepo loginRepo;

    @Autowired
    private PasswordResetTokenRepo passwordResetTokenRepo;
    @Autowired
    private EmailService emailService;

public boolean accountExistsChecker(String email){
 User user = loginRepo.findByEmail(email).orElseThrow();
   Boolean emailExists =  loginRepo.findByEmail(email).isPresent();

   String token = UUID.randomUUID().toString();

   PasswordResetToken resetToken = new PasswordResetToken();
   resetToken.setToken(token);
   resetToken.setUser(user);
   resetToken.setExpiresAt(LocalDateTime.now().plusMinutes(30));
   passwordResetTokenRepo.save(resetToken); 

  //  requires reconfiguring for prod

   String resetLink = "https://e3092478.ecomwebapp.pages.dev/newpassword?token=" + token;
       if(emailExists)  emailService.sendResetPasswordMail(email,resetLink);
     return emailExists;
}
}
