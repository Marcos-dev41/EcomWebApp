package com.ecom.web.model;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Orders")

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;
    private String orderStatus;
    private BigDecimal orderTotal;
    private String checkoutRequestId;
    

@JsonManagedReference
 @OneToMany(mappedBy = "orders" ,cascade = CascadeType.ALL)
   private List <OrderItem> orderItems;

@ManyToOne()
@JoinColumn(name = "user_id")
@JsonIgnoreProperties({"order", "userPassword"})
 private User user;


}
