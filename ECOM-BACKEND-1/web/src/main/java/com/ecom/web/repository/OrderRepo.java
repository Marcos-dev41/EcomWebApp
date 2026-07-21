package com.ecom.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.web.model.Order;

public interface OrderRepo  extends JpaRepository <Order,Integer>{
    
}
