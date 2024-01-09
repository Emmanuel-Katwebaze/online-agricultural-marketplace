package com.emmakatwebaze.adminbackend.repository;

import com.emmakatwebaze.adminbackend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
