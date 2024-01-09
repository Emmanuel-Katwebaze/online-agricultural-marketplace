package com.emmakatwebaze.adminbackend.service.orderitem;

import com.emmakatwebaze.adminbackend.entity.*;
import com.emmakatwebaze.adminbackend.entity.OrderItem;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.repository.ProductRepository;
import com.emmakatwebaze.adminbackend.repository.OrderItemRepository;
import com.emmakatwebaze.adminbackend.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class OrderItemServiceImp implements OrderItemService{

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public OrderItem saveOrderItem(OrderItem orderItem) {
        // Fetch the Order entity from the database
        Order order = orderRepository.findById(orderItem.getOrder().getOrderId())
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + orderItem.getOrder().getOrderId()));

        // Set the Order instance in the OrderItem
        orderItem.setOrder(order);

        // Fetch the Product entity from the database
        Product product = productRepository.findById(orderItem.getProduct().getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + orderItem.getProduct().getProductId()));

        // Set the Order instance in the OrderItem
        orderItem.setProduct(product);

        // Save the OrderItem
        return orderItemRepository.save(orderItem);
    }

    @Override
    public List<OrderItem> fetchOrderItemsList() {
        return orderItemRepository.findAll();
    }

    @Override
    public OrderItem fetchOrderItemById(Long orderItemId) throws ResourceNotFoundException {
        Optional<OrderItem> orderItem = orderItemRepository.findById(orderItemId);
        if(!orderItem.isPresent()){
            throw new ResourceNotFoundException("OrderItem Not Available");
        }
        return orderItem.get();
    }

    @Override
    public OrderItem updateOrderItem(Long orderItemId, OrderItem orderItem) {
        OrderItem orderItemDB = orderItemRepository.findById(orderItemId).get();

        if (orderItem.getQuantity() != null && orderItem.getQuantity() > 0) {
            orderItemDB.setQuantity(orderItem.getQuantity());
        }

        if (orderItem.getSubtotal() != null && orderItem.getSubtotal() > 0) {
            orderItemDB.setSubtotal(orderItem.getSubtotal());
        }


        return orderItemRepository.save(orderItemDB);
    }

    @Override
    public void deleteOrderItemById(Long orderItemId) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new EntityNotFoundException("OrderItem not found with id: " + orderItemId));

        // Remove the association with the order
        orderItem.setOrder(null);

        // Remove the association with the product
        orderItem.setProduct(null);

        orderItemRepository.delete(orderItem);
    }
}
