package com.ecom.web.controller;

import com.ecom.web.model.*;
import com.ecom.web.service.AccountExistsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AccountExistsController {
    @Autowired
    private AccountExistsService accountExistsService;
    
    @RequestMapping("/account")
    public ResponseEntity<Boolean> accountExists(@RequestBody User user){
        boolean exists = accountExistsService.accountExistsChecker(user.getEmail());
        return ResponseEntity.ok(exists);
    }
}
