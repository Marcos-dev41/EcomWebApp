package com.ecom.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.web.model.Order;
import com.ecom.web.model.User;
import com.ecom.web.repository.LoginRepo;
import com.ecom.web.repository.OrderRepo;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private LoginRepo loginRepo;

    @Autowired
    private OrderRepo orderRepo;


    @GetMapping("/my-orders")
public List<Order> getMyOrders() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = loginRepo.findByEmail(email).orElseThrow();
    return orderRepo.findByUser_UserId(user.getUserId());
    
}
}
