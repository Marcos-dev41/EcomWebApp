package com.ecom.web.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.web.model.Order;

public interface OrderRepo  extends JpaRepository <Order,Integer>{
     Optional<Order>findByCheckoutRequestId(String checkoutRequestId);
}
