package com.emmakatwebaze.adminbackend.controller;

import com.emmakatwebaze.adminbackend.entity.Category;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.service.category.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    private final Logger LOGGER = LoggerFactory.getLogger(CategoryController.class);
    @PostMapping("/categories")
    public Category saveCategory(@RequestBody Category category){
        LOGGER.info("Inside saveCategory of CategoryController");
        return categoryService.saveCategory(category);
    }

    @GetMapping("/categories")
    public List<Category> fetchCategoryList(){
        LOGGER.info("Inside fetchCategoryList of CategoryController");
        return categoryService.fetchCategoryList();
    }

    @GetMapping("/categories/{id}")
    public Category fetchCategoryById(@PathVariable("id") Long categoryId) throws ResourceNotFoundException {
        return categoryService.fetchCategoryById(categoryId);
    }

    @PutMapping("/categories/{id}")
    public Category updateCategory(@PathVariable("id") Long categoryId, @RequestBody Category category) {
        return categoryService.updateCategory(categoryId, category);
    }

    @DeleteMapping("/categories/{id}")
    public String deleteCategoryById(@PathVariable("id") Long categoryId){
        categoryService.deleteCategoryById(categoryId);
        return "Category deleted Successfully!";
    }
}
