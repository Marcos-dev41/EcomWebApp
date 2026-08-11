package com.ecom.web.controller;

import java.util.UUID;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.web.model.CheckoutRequestDto;
import com.ecom.web.model.Order;
import com.ecom.web.model.PaymentRequestDto;
import com.ecom.web.repository.OrderRepo;
import com.ecom.web.service.PaymentRequestPublisher;


@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private final OrderRepo orderRepository;
    private final PaymentRequestPublisher publisher;


    public CheckoutController(OrderRepo orderRepository, PaymentRequestPublisher publisher) {
        this.orderRepository = orderRepository;
        this.publisher = publisher;
    }

 
    @PostMapping("/pay")
    public ResponseEntity<?> initiatePayment(@RequestBody CheckoutRequestDto request) {

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found: " + request.getOrderId()));
        
        String email = order.getUser().getEmail();

        String correlationId = UUID.randomUUID().toString();

    
        //  Here I  setup the json body going to my broker -> payment microservice
        
        PaymentRequestDto dto = new PaymentRequestDto();
        dto.setOrderId(order.getOrderId());
        dto.setAmount(order.getOrderTotal());
        dto.setCurrency("KES");
        dto.setProvider("mpesa");
        dto.setUserId(order.getUser().getUserId());
        dto.setPhoneNumber(request.getPhoneNumber());
        dto.setEmail(email);
        dto.setCorrelationId(correlationId);
        

        order.setOrderStatus("PENDING");
        order.setCorrelationId(correlationId);
        orderRepository.save(order);

        publisher.publishMpesaRequest(dto);

        // message showing the payment request has been published into my broker waiting for the payment service

        return ResponseEntity.accepted().body(Map.of(
                "message", "Payment initiated",
                "orderId", order.getOrderId()
        ));
    }
}