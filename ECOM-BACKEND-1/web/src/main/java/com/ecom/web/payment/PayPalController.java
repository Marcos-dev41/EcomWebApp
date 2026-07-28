package com.ecom.web.payment;

import com.ecom.web.repository.OrderRepo;
import com.ecom.web.service.PayPalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecom.web.model.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/paypal")

public class PayPalController {

    @Autowired
    private OrderRepo orderRepo;
   
    private final PayPalService payPalService;

    public PayPalController(PayPalService payPalService) {
        this.payPalService = payPalService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> request) {

        Integer orderId = Integer.parseInt(request.get("orderId").toString());
    
    // Fetch real order amount from database
        Order order = orderRepo.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        BigDecimal amount = order.getOrderTotal();
        // Always derive or validate the actual price on the server!
        Map<String, Object> orderTotal = payPalService.createOrder(amount);
        return ResponseEntity.ok(orderTotal);
    }

    @PostMapping("/capture-order/{orderId}")
    public ResponseEntity<Map<String, Object>> captureOrder(@PathVariable String orderId) {
        Map<String, Object> captureData = payPalService.captureOrder(orderId);


        
        // Handle post-payment logic (e.g., mark order as paid in DB)
        String status = (String) captureData.get("status");
        if ("COMPLETED".equals(status)) {
            // updateOrderStatusInDb(orderId, "PAID");
        }

        return ResponseEntity.ok(captureData);
    }
}