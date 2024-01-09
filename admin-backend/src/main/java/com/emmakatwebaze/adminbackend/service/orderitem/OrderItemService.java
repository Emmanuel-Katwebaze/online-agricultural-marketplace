package com.emmakatwebaze.adminbackend.service.orderitem;

import com.emmakatwebaze.adminbackend.entity.OrderItem;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;

import java.util.List;

public interface OrderItemService {
    OrderItem saveOrderItem(OrderItem orderItem);

    List<OrderItem> fetchOrderItemsList();

    OrderItem fetchOrderItemById(Long orderItemId) throws ResourceNotFoundException;

    OrderItem updateOrderItem(Long orderItemId, OrderItem orderItem);

    void deleteOrderItemById(Long orderItemId);
}
