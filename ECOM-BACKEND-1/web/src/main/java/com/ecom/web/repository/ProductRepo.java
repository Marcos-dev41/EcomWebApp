package com.ecom.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom.web.model.Product;

@Repository
public interface ProductRepo extends JpaRepository <Product, Integer> {

    
} 
