package com.ecom.web.repository;

import com.ecom.web.model.*;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepo extends JpaRepository<User ,Integer> {
 Optional<User> findByEmail(String email);
}
