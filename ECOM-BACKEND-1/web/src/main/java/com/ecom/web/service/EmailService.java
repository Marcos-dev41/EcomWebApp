package com.ecom.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ecom.web.model.Order;

@Service
public class EmailService{
@Autowired
private JavaMailSender mailSender;


public void sendPaymentConfirmation(String toEmail ,Order order){
 
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(toEmail);
    message.setSubject("Payment Confrimation -Order #" + order.getOrderId());
    message.setText("Your payment of ksh " + order.getOrderTotal() + " has been recieved succesfully. Thankyou!");
    mailSender.send(message);
}

public void sendPaymentFailure(String toEmail ,Order order){
 
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(toEmail);
    message.setSubject("Payment Failed -Order #" + order.getOrderId());
    message.setText("Your payment of ksh " + order.getOrderTotal() + " has been FAILED. please try again");
    mailSender.send(message);
}
}