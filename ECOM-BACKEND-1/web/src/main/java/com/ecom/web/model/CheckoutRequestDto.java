package com.ecom.web.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CheckoutRequestDto {
    private Integer orderId;
    private String phoneNumber;
}
