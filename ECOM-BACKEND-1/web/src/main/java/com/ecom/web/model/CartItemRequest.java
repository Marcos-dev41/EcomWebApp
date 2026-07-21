package com.ecom.web.model;

import lombok.Data;

@Data
public class CartItemRequest {
    private Integer prodId;
    private Integer quantity;
}
