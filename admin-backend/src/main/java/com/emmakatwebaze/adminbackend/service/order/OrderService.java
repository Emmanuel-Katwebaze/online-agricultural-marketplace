package com.emmakatwebaze.adminbackend.service.order;

import com.emmakatwebaze.adminbackend.entity.Order;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;

import java.util.List;

public interface OrderService {
    Order saveOrder(Order order);

    List<Order> fetchOrdersList();

    Order fetchOrderById(Long orderId) throws ResourceNotFoundException;

    Order updateOrder(Long orderId, Order order);

    void deleteOrderById(Long orderId);
}
