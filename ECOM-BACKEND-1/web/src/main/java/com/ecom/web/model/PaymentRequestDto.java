package com.ecom.web.model;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PaymentRequestDto {
    private Integer orderId;
    private BigDecimal amount;
    private String currency;
    private String provider;
    private Integer userId;
    private String phoneNumber;
    private String email;
    private String correlationId;

    // constructor, getters/setters
}
