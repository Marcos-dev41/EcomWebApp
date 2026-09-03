package com.ecom.web.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ShippingInfoDto {
    private String fullName;
    private String streetAddress;
    private String city;
    private String postalCode;
}
