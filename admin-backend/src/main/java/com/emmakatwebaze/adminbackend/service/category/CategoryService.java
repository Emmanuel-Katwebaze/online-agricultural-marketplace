package com.emmakatwebaze.adminbackend.service.category;

import com.emmakatwebaze.adminbackend.entity.Category;
import com.emmakatwebaze.adminbackend.entity.Category;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;

import java.util.List;

public interface CategoryService {
    public Category saveCategory(Category category);

    Category updateCategory(Long categoryId, Category category);

    List<Category> fetchCategoryList();

    Category fetchCategoryById(Long categoryId) throws ResourceNotFoundException;

    void deleteCategoryById(Long categoryId);
}
