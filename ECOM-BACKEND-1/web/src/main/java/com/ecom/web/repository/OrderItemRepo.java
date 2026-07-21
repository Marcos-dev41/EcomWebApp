package com.ecom.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.web.model.OrderItem;

public interface OrderItemRepo extends JpaRepository <OrderItem, Integer>{
    
}
