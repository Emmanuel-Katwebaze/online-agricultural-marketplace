package com.emmakatwebaze.adminbackend.controller;

import com.emmakatwebaze.adminbackend.api_response.ApiResponse;
import com.emmakatwebaze.adminbackend.entity.Order;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.service.order.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    private final Logger LOGGER = LoggerFactory.getLogger(OrderController.class);
    @PostMapping("/api/orders")
    public Order saveOrder(@RequestBody Order order){
        LOGGER.info("Inside saveOrder of OrderController");
        return orderService.saveOrder(order);
    }

    @GetMapping("/api/orders")
    public List<Order> fetchOrdersList(){
        LOGGER.info("Inside fetchOrdersList of OrderController");
        return orderService.fetchOrdersList();
    }

    @GetMapping("/api/orders/{id}")
    public Order fetchOrderById(@PathVariable("id") Long orderId) throws ResourceNotFoundException {
        return orderService.fetchOrderById(orderId);
    }

    @PutMapping("/api/orders/{id}")
    public Order updateOrder(@PathVariable("id") Long orderId, @RequestBody Order order) {
        return orderService.updateOrder(orderId, order);
    }

    @DeleteMapping("/api/orders/{id}")
    public ResponseEntity<ApiResponse> deleteOrderById(@PathVariable("id") Long orderId){
        orderService.deleteOrderById(orderId);
        return ResponseEntity.ok(new ApiResponse("Order deleted Successfully!"));
    }
}
