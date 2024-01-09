package com.emmakatwebaze.adminbackend.repository;

import com.emmakatwebaze.adminbackend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
