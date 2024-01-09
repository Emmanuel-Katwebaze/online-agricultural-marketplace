package com.emmakatwebaze.adminbackend.controller;

import com.emmakatwebaze.adminbackend.entity.OrderItem;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.service.orderitem.OrderItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    private final Logger LOGGER = LoggerFactory.getLogger(OrderItemController.class);
    @PostMapping("/orderItems")
    public OrderItem saveOrderItem(@RequestBody OrderItem orderItem){
        LOGGER.info("Inside saveOrderItem of OrderItemController");
        return orderItemService.saveOrderItem(orderItem);
    }

    @GetMapping("/orderItems")
    public List<OrderItem> fetchOrderItemsList(){
        LOGGER.info("Inside fetchOrderItemsList of OrderItemController");
        return orderItemService.fetchOrderItemsList();
    }

    @GetMapping("/orderItems/{id}")
    public OrderItem fetchOrderItemById(@PathVariable("id") Long orderItemId) throws ResourceNotFoundException {
        return orderItemService.fetchOrderItemById(orderItemId);
    }

    @PutMapping("/orderItems/{id}")
    public OrderItem updateOrderItem(@PathVariable("id") Long orderItemId, @RequestBody OrderItem orderItem) {
        return orderItemService.updateOrderItem(orderItemId, orderItem);
    }

    @DeleteMapping("/orderItems/{id}")
    public String deleteOrderItemById(@PathVariable("id") Long orderItemId){
        orderItemService.deleteOrderItemById(orderItemId);
        return "OrderItem deleted Successfully!";
    }
}
