package com.emmakatwebaze.adminbackend.repository;

import com.emmakatwebaze.adminbackend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
