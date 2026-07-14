package com.ecom.web.controller;

// import com.ecom.web.service.LoginService;
import com.ecom.web.model.User;
import com.ecom.web.service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class LoginController {
    @Autowired
    LoginService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        // Assume service returning a boolean or a user object checking password matching
        boolean isAuthenticated = service.checkCredentials(user); 
        
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

}
