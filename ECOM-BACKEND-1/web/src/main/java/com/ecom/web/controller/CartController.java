package com.ecom.web.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.web.model.CartItemRequest;
import com.ecom.web.service.createOrderFromCart;

@RestController
@RequestMapping("/api/payment")
public class CartController {

    private createOrderFromCart service;

    @PostMapping("/checkout")
    public void getCheckOutDetails(@RequestBody List<CartItemRequest> cartItemRequests){
        // service.createOrderFromCart(cartItemRequests);
    }
}
