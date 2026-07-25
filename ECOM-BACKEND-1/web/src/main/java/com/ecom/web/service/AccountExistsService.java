package com.ecom.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.ecom.web.repository.*;

@Service
public class AccountExistsService {
    @Autowired
    private LoginRepo loginRepo;

public boolean accountExistsChecker(String email){
   
   return loginRepo.findByEmail(email).isPresent();
}

}
