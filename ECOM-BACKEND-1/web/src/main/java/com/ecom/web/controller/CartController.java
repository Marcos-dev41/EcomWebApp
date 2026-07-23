package com.ecom.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.web.model.CartItemRequest;
import com.ecom.web.model.Order;
import com.ecom.web.service.CreateOrderFromCart;

@RestController
@RequestMapping("/api/payment")
public class CartController {
    @Autowired
    private CreateOrderFromCart service;

    @PostMapping("/checkout")
    public Order getCheckOutDetails(@RequestBody List<CartItemRequest> cartItemRequests){
         return service.createOrderFromCart(cartItemRequests);
    }
}
