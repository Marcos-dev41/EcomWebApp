package com.ecom.web.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.ecom.web.model.CartItemRequest;
import com.ecom.web.model.Order;
import com.ecom.web.model.Product;
import com.ecom.web.model.User;
import com.ecom.web.model.OrderItem;
import com.ecom.web.repository.LoginRepo;
import com.ecom.web.repository.OrderRepo;
import com.ecom.web.repository.ProductRepo;


@Service
public class CreateOrderFromCart {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private LoginRepo loginRepo;

    @Autowired
    private ProductRepo productRepo;
    
    public Order createOrderFromCart (List<CartItemRequest> cartItems){
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;
        System.out.println("hello bwoooooy-----------------------------------------------------------------------------------------");
        System.out.println(cartItems);



        for(CartItemRequest item : cartItems){
            Product product = productRepo.findById(item.getProdId()).orElse(null);
          if (product.getDiscount() > 0) {
    BigDecimal discountRate = BigDecimal.valueOf(product.getDiscount())
        .divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);
    BigDecimal discountedUnitPrice = product.getPrice()
        .subtract(product.getPrice().multiply(discountRate))
        .setScale(2, RoundingMode.HALF_UP);
    BigDecimal lineTotal = discountedUnitPrice.multiply(BigDecimal.valueOf(item.getQuantity()));
    total = total.add(lineTotal);
    } else {
    BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
    total = total.add(lineTotal);
            }          
            
            OrderItem orderItem = new OrderItem();
            orderItem.setProdId(item.getProdId());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setProdName(item.getProdName());
            orderItem.setImageUrl(item.getImageUrl());
            orderItem.setPriceAtOrderTime(product.getPrice());

            orderItems.add(orderItem);
            
        }
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user =  loginRepo.findByEmail(email).orElseThrow();

        Order order = new Order();
        order.setOrderStatus("PENDING");
        order.setOrderTotal(total);
        order.setOrderItems(orderItems);
        order.setUser(user);

        for(OrderItem orderItem : orderItems){
            orderItem.setOrders(order);
        }

        orderRepo.save(order);

        return order;
    }
}
