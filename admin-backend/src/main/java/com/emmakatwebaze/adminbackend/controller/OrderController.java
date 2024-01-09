package com.emmakatwebaze.adminbackend.controller;

import com.emmakatwebaze.adminbackend.entity.Order;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.service.order.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    private final Logger LOGGER = LoggerFactory.getLogger(OrderController.class);
    @PostMapping("/orders")
    public Order saveOrder(@RequestBody Order order){
        LOGGER.info("Inside saveOrder of OrderController");
        return orderService.saveOrder(order);
    }

    @GetMapping("/orders")
    public List<Order> fetchOrdersList(){
        LOGGER.info("Inside fetchOrdersList of OrderController");
        return orderService.fetchOrdersList();
    }

    @GetMapping("/orders/{id}")
    public Order fetchOrderById(@PathVariable("id") Long orderId) throws ResourceNotFoundException {
        return orderService.fetchOrderById(orderId);
    }

    @PutMapping("/orders/{id}")
    public Order updateOrder(@PathVariable("id") Long orderId, @RequestBody Order order) {
        return orderService.updateOrder(orderId, order);
    }

    @DeleteMapping("/orders/{id}")
    public String deleteOrderById(@PathVariable("id") Long orderId){
        orderService.deleteOrderById(orderId);
        return "Order deleted Successfully!";
    }
}
