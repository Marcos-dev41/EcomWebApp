package com.ecom.web.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private DarajaService darajaService;

    @GetMapping("/test-token")
    public String testToken() {
        return darajaService.getAccessToken();
    }
}