package com.ecom.web.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.ecom.web.model.CartItemRequest;
import com.ecom.web.model.Order;
import com.ecom.web.model.OrderItem;
import com.ecom.web.model.Product;
import com.ecom.web.repository.OrderRepo;

public class createOrderFromCart {

    @Autowired
    private OrderRepo orderRepo;
    
//     public Order createOrderFromCart (List<CartItemRequest> cartItems){
//         List<OrderItem> orderItems = new ArrayList<>();
//         BigDecimal total = BigDecimal.ZERO;

//         // for(CartItemRequest item : cartItems){
//         //     Product product = findProduct(item.getProdId());
//         //     total = (product.price * item.quantity);
//         // }

//         Order order = new Order();

//         orderRepo.save(order);
//     }
// }
