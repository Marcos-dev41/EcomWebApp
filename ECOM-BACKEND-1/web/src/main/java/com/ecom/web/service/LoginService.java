package com.ecom.web.service;

import  com.ecom.web.repository.LoginRepo;
import com.ecom.web.model.*;


import java.util.List;
import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    LoginRepo repo;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    EmailService emailService;

    public void addAccount(User user){
        String hashed  = encoder.encode(user.getUserPassword());
        user.setUserPassword(hashed);
        user.setRole("USER");
        repo.save(user);
        emailService.sendRegistrationMail(user.getEmail());
    }
    public boolean checkCredentials(User user){
        Optional<User> foundUser = repo.findByEmail(user.getEmail());
    if (foundUser.isEmpty()) {
        return false;
    }
    return encoder.matches(user.getUserPassword(), foundUser.get().getUserPassword());
    }
    public List<User>  accounts(){
         return repo.findAll();
    }
   
}
