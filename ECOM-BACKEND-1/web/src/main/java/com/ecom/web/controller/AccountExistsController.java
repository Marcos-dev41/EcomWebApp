package com.ecom.web.controller;

import com.ecom.web.model.*;
import java.util.Map;
import com.ecom.web.service.AccountExistsService;
import com.ecom.web.service.PasswordResetTokenService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AccountExistsController {
    @Autowired
    private AccountExistsService accountExistsService;

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;
    
    @RequestMapping("/forgot-password")
    public ResponseEntity<Boolean> accountExists(@RequestBody User user){
        boolean exists = accountExistsService.accountExistsChecker(user.getEmail());
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String newPassword = body.get("userPassword");

        boolean success = passwordResetTokenService.resetPassword(token, newPassword);

        if (success) {
            return ResponseEntity.ok(Map.of("message", "Password reset successful."));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid or expired reset link."));
        }
    }
}
