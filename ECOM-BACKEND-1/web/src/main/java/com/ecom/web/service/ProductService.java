package com.ecom.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ecom.web.repository.*;
import com.ecom.web.model.Product;

@Service
public class ProductService {
@Autowired
ProductRepo repo;
    @Cacheable("products")
   public List<Product> getProducts(){
        return repo.findAll();
    }

    @CacheEvict(value="products",allEntries = true)
   public List<Product> createProducts(@RequestBody List<Product> products) {
     return repo.saveAll(products);
    }

    @Cacheable(value="products",key="#prodId")
    public Product getPoductById(int prodId){
        return repo.findById(prodId).orElse(null);
    }

    @CacheEvict(value="products",allEntries = true)
    public void addProducts(Product prod){
        repo.save(prod);
    }

    @CacheEvict(value="products",allEntries = true)
    public void updateProducts(Product prod){
        repo.save(prod);
    }
    
    @CacheEvict(value="products",allEntries = true)
    public void deleteProducts(int prodId){
        repo.deleteById(prodId);
    }
   } 

