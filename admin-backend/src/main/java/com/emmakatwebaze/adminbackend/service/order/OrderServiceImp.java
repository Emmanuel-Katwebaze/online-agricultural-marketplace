package com.emmakatwebaze.adminbackend.service.order;

import com.emmakatwebaze.adminbackend.entity.Category;
import com.emmakatwebaze.adminbackend.entity.Order;
import com.emmakatwebaze.adminbackend.entity.User;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.repository.OrderRepository;
import com.emmakatwebaze.adminbackend.repository.UserRepository;
import com.emmakatwebaze.adminbackend.service.order.OrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class OrderServiceImp implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public Order saveOrder(Order order) {
        // Check if userId is provided
//        if (order.getUser() == null || order.getUser().getUserId() == null) {
//            throw new IllegalArgumentException("UserId must be provided for the order.");
//        }

        // Fetch the User entity from the database
        User user = userRepository.findById(order.getUser().getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + order.getUser().getUserId()));

        // Set the User instance in the Order
        order.setUser(user);

        // Save the Order
        return orderRepository.save(order);
    }


    @Override
    public List<Order> fetchOrdersList() {
        return orderRepository.findAll();
    }

    @Override
    public Order fetchOrderById(Long orderId) throws ResourceNotFoundException{
        Optional<Order> order = orderRepository.findById(orderId);
        if(!order.isPresent()){
            throw new ResourceNotFoundException("Order Not Available");
        }
        return order.get();
    }

    @Override
    public Order updateOrder(Long orderId, Order order) {
        Order orderDB = orderRepository.findById(orderId).get();

        if (order.getUser() != null) {
            // Assuming you have a method to fetch the category by ID from the repository
            User updatedUser = userRepository.findById(order.getUser().getUserId()).orElse(null);
            if (updatedUser != null) {
                orderDB.setUser(updatedUser);
            }
        }

        if(Objects.nonNull(order.getOrderDate()) && !"".equalsIgnoreCase(order.getOrderDate())){
            orderDB.setOrderDate(order.getOrderDate());
        }

        if (order.getTotalAmount() != null && order.getTotalAmount() > 0) {
            orderDB.setTotalAmount(order.getTotalAmount());
        }

        if(Objects.nonNull(order.getStatus()) && !"".equalsIgnoreCase(order.getStatus())){
            orderDB.setStatus(order.getStatus());
        }


        return orderRepository.save(orderDB);
    }

    @Override
    public void deleteOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + orderId));

        // Remove the association with the user
        order.setUser(null);

        orderRepository.delete(order);
    }
}
