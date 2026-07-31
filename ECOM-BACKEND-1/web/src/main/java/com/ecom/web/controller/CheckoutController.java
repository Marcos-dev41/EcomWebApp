package com.ecom.web.controller;

import java.util.UUID;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userId = auth.getName(); // adjust if your principal exposes id differently
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found: " + request.getOrderId()));

    

        PaymentRequestDto dto = new PaymentRequestDto();
        dto.setOrderId(order.getOrderId());
        dto.setAmount(order.getOrderTotal());
        dto.setCurrency("KES");
        dto.setProvider("mpesa");
        dto.setUserId(userId);
        dto.setPhoneNumber(request.getPhoneNumber());
        dto.setCorrelationId(UUID.randomUUID().toString());
        

        order.setOrderStatus("PENDING_PAYMENT");
        orderRepository.save(order);

        publisher.publishMpesaRequest(dto);

        return ResponseEntity.accepted().body(Map.of(
                "message", "Payment initiated",
                "orderId", order.getOrderId()
        ));
    }
}