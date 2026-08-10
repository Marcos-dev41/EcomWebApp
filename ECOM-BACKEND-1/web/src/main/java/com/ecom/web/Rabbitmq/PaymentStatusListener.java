package com.ecom.web.Rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ecom.web.model.PaymentStatusUpdate;
import com.ecom.web.model.Order;
import com.ecom.web.repository.OrderRepo;

@Component
public class PaymentStatusListener {

    @Autowired
    private OrderRepo orderRepo;

    @RabbitListener(queues = "payment.status.queue")
    public void handlePaymentStatusUpdate(PaymentStatusUpdate update) {
        Order order = orderRepo.findByCorrelationId(update.getCorrelationId()).orElse(null);

        if (order == null) {
            System.out.println("No matching order for correlationId: " + update.getCorrelationId());
            return;
        }

        order.setOrderStatus(update.getStatus());
        orderRepo.save(order);

        System.out.println("Order " + order.getOrderId() + " updated to status: " + update.getStatus());
    }
}