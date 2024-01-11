package com.emmakatwebaze.adminbackend.controller;

import com.emmakatwebaze.adminbackend.api_response.ApiResponse;
import com.emmakatwebaze.adminbackend.entity.OrderItem;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.service.orderitem.OrderItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    private final Logger LOGGER = LoggerFactory.getLogger(OrderItemController.class);
    @PostMapping("/api/orderItems")
    public OrderItem saveOrderItem(@RequestBody OrderItem orderItem){
        LOGGER.info("Inside saveOrderItem of OrderItemController");
        return orderItemService.saveOrderItem(orderItem);
    }

    @GetMapping("/api/orderItems")
    public List<OrderItem> fetchOrderItemsList(){
        LOGGER.info("Inside fetchOrderItemsList of OrderItemController");
        return orderItemService.fetchOrderItemsList();
    }

    @GetMapping("/api/orderItems/{id}")
    public OrderItem fetchOrderItemById(@PathVariable("id") Long orderItemId) throws ResourceNotFoundException {
        return orderItemService.fetchOrderItemById(orderItemId);
    }

    @PutMapping("/api/orderItems/{id}")
    public OrderItem updateOrderItem(@PathVariable("id") Long orderItemId, @RequestBody OrderItem orderItem) {
        return orderItemService.updateOrderItem(orderItemId, orderItem);
    }

    @DeleteMapping("/api/orderItems/{id}")
    public ResponseEntity<ApiResponse> deleteOrderItemById(@PathVariable("id") Long orderItemId){
        orderItemService.deleteOrderItemById(orderItemId);
        return ResponseEntity.ok(new ApiResponse("OrderItem deleted Successfully!"));
    }
}
