package com.ecom.web.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor


public class Product {
    
    @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer prodId;
    private String prodName;
    private boolean isAvailable;
    private String prodDescription;
    private BigDecimal price;
}
