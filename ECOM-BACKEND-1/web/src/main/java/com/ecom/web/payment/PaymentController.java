package com.ecom.web.payment;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.web.model.Order;
import com.ecom.web.repository.OrderRepo;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private DarajaService darajaService;

    @Autowired
    private OrderRepo orderRepo;

    @GetMapping("/test-token")
    public String testToken() {
        return darajaService.getAccessToken();
    }

    @PostMapping("/stkpush/{orderId}")
    public Map<String,Object> triggerStkPush(@PathVariable Integer orderId,@RequestParam String phoneNumber){
        Order order = orderRepo.findById(orderId).orElseThrow();
        return darajaService.intiateStkPush(order, phoneNumber);

    }

    @PostMapping("/callback")
public Map<String, Object> handleCallback(@RequestBody Map<String, Object> callbackData) {
    System.out.println("Daraja callback received: " + callbackData);
    // next: extract result, update the matching Order's status
    return Map.of("ResultCode", 0, "ResultDesc", "Accepted");
}
}