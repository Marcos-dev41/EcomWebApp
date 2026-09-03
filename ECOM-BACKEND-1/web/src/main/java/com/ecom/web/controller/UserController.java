package com.ecom.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.ecom.web.model.UpdateUserDetailsRequest;


import com.ecom.web.service.UserDetailService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserDetailService userDetailService;
    @PutMapping("/user-details") // or @PostMapping
    public ResponseEntity<?> updateUserDetails(
            @RequestBody UpdateUserDetailsRequest request,
            Authentication authentication) {

        // The username/email extracted from your JWT token:
        String currentUserEmail = authentication.getName();

        userDetailService.updateDetails(currentUserEmail, request);

        return ResponseEntity.ok("User details updated successfully");
    }
}