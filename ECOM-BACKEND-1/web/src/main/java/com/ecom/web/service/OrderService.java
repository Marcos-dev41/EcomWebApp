package com.ecom.web.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ecom.web.model.Product;
import com.ecom.web.repository.ProductRepo;

@Component
public class OrderService {

    @Autowired
    private ProductRepo productRepo;

    
    public Product findProduct(Integer prodId){
     Optional <Product>  foundProduct =  productRepo.findById(prodId);
     return foundProduct.orElse(null);
    }
    
}
