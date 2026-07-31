package com.ecom.web.service;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.stereotype.Service;

import com.ecom.web.Rabbitmq.RabbitConfig;
import com.ecom.web.model.PaymentRequestDto;

@Service
public class PaymentRequestPublisher {
    private final AmqpTemplate rabbitTemplate;

    public PaymentRequestPublisher(AmqpTemplate rabbitTemplate){
        this.rabbitTemplate= rabbitTemplate;
    }
    public void publishMpesaRequest(PaymentRequestDto dto) {
        rabbitTemplate.convertAndSend(
            RabbitConfig.EXCHANGE,
            RabbitConfig.REQUEST_ROUTING_KEY,
            dto
        );}
}
