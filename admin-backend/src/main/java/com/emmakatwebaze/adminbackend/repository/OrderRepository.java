package com.emmakatwebaze.adminbackend.repository;

import com.emmakatwebaze.adminbackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
