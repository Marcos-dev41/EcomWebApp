package com.ecom.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecom.web.model.User;
import com.ecom.web.repository.LoginRepo;
import com.ecom.web.model.UpdateUserDetailsRequest;

@Service
public class UserDetailService {

    @Autowired
    private LoginRepo userRepository;

    @Transactional
    public void updateDetails(String email, UpdateUserDetailsRequest request) {
        // 1. Fetch the user from the database
        User existingUser = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found: " + email));

        // 2. Modify only the fields you want to update
        if (request.getName() != null && !request.getName().isBlank()) {
            existingUser.setFullName(request.getName());
        }
        if (request.getPhoneNumber() != null && !request.getPhoneNumber().isBlank()) {
            existingUser.setPhoneNumber(request.getPhoneNumber());
        }

        // 3. Save the entity
        // Because existingUser already has its primary key (ID) set,
        // JPA/Hibernate executes an UPDATE SQL statement rather than an INSERT.
        userRepository.save(existingUser);
    }
}