package com.ecom.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.ecom.web.repository.*;

@Service
public class AccountExistsService {
    @Autowired
    private LoginRepo loginRepo;
    @Autowired
    private EmailService emailService;

public boolean accountExistsChecker(String email){
      System.out.println("hello");

   Boolean emailExists =  loginRepo.findByEmail(email).isPresent();
   System.out.println(email);
     if(emailExists) System.out.println("hello"); emailService.sendResetPasswordMail(email);
     return emailExists;
}
}
