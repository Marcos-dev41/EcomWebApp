package com.ecom.web.controller;

import org.springframework.web.bind.annotation.RestController;

import com.ecom.web.model.Product;
import com.ecom.web.service.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")

public class ProductController {
    @Autowired
    ProductService service;

    @RequestMapping ("/")
    public String homePage(){
        // returning pproducts json info from my db
        return "Welcome home"; 
    }
    @RequestMapping("/products")
    public List<Product> getProduct(){
        return service.getProducts();
    }
    @PostMapping("/products")
    public void addProduct(@RequestBody Product prod){
        service.addProducts(prod);
    }
    @PostMapping("/products/bulk")
    public void addBulkProducts(@RequestBody List<Product> prod){
        service.createProducts(prod);
    }
    @PutMapping("/products")
        public void updateProduct(@RequestBody Product prod){
            service.updateProducts(prod);
        }
    @DeleteMapping("/products/{prodId}")
        public void removeProducts(@PathVariable int prodId){
            service.deleteProducts(prodId);
        }
    }
    

