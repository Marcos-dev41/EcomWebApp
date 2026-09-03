package com.ecom.web.model;

import java.util.List;

import lombok.AllArgsConstructor;
import com.ecom.web.model.ShippingInfoDto;
import lombok.Data;

@Data
@AllArgsConstructor
public class CheckoutRequestDto {
    private Integer orderId;
    private String phoneNumber;
    private ShippingInfoDto shippingInfo;
}
