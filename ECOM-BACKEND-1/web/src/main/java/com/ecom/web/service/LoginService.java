package com.ecom.web.service;
import  com.ecom.web.repository.LoginRepo;
import com.ecom.web.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    LoginRepo repo;

    public void getLoginDetails(User user){
        repo.save(user);
    }
    public boolean checkCredentials(User user){
        return true;
    }
}
