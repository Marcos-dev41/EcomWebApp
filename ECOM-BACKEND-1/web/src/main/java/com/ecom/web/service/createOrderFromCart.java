package com.ecom.web.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.web.model.CartItemRequest;
import com.ecom.web.model.Order;
import com.ecom.web.model.Product;
import com.ecom.web.model.OrderItem;
import com.ecom.web.repository.OrderRepo;
import com.ecom.web.repository.ProductRepo;


@Service
public class CreateOrderFromCart {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ProductRepo productRepo;
    
    public Order createOrderFromCart (List<CartItemRequest> cartItems){
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;



        for(CartItemRequest item : cartItems){
            Product product = productRepo.findById(item.getProdId()).orElse(null);
            BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            total = total.add(lineTotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setProdId(item.getProdId());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPriceAtOrderTime(product.getPrice());

            orderItems.add(orderItem);
            
        }

        Order order = new Order();
        order.setOrderStatus("PENDING");
        order.setOrderTotal(total);
        order.setOrderItems(orderItems);

        for(OrderItem orderItem : orderItems){
            orderItem.setOrders(order);
        }

        orderRepo.save(order);

        return order;
    }
}
