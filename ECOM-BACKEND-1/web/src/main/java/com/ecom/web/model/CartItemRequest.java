package com.ecom.web.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CartItemRequest {
    private Integer prodId;
    private Integer quantity;
}
