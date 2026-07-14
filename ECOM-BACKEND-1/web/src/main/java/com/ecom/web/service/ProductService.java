package com.ecom.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ecom.web.repository.*;
import com.ecom.web.model.Product;

@Service
public class ProductService {
@Autowired
ProductRepo repo;
   public List<Product> getProducts(){
        return repo.findAll();
    }
   public List<Product> createProducts(@RequestBody List<Product> products) {
     return repo.saveAll(products);
    }
    public Product getPoductById(int prodId){
        return repo.findById(prodId).orElse(null);
    }
    public void addProducts(Product prod){
        repo.save(prod);
    }
    public void updateProducts(Product prod){
        repo.save(prod);
    }
    public void deleteProducts(int prodId){
        repo.deleteById(prodId);
    }
   } 

