package com.emmakatwebaze.adminbackend.controller;

import com.emmakatwebaze.adminbackend.api_response.ApiResponse;
import com.emmakatwebaze.adminbackend.entity.Category;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.service.category.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    private final Logger LOGGER = LoggerFactory.getLogger(CategoryController.class);
    @PostMapping("/api/categories")
    public Category saveCategory(@RequestBody Category category){
        LOGGER.info("Inside saveCategory of CategoryController");
        return categoryService.saveCategory(category);
    }

    @GetMapping("/api/categories")
    public List<Category> fetchCategoryList(){
        LOGGER.info("Inside fetchCategoryList of CategoryController");
        return categoryService.fetchCategoryList();
    }

    @GetMapping("/api/categories/{id}")
    public Category fetchCategoryById(@PathVariable("id") Long categoryId) throws ResourceNotFoundException {
        return categoryService.fetchCategoryById(categoryId);
    }

    @PutMapping("/api/categories/{id}")
    public Category updateCategory(@PathVariable("id") Long categoryId, @RequestBody Category category) {
        return categoryService.updateCategory(categoryId, category);
    }

    @DeleteMapping("/api/categories/{id}")
    public ResponseEntity<ApiResponse> deleteCategoryById(@PathVariable("id") Long categoryId){
        categoryService.deleteCategoryById(categoryId);
        return ResponseEntity.ok(new ApiResponse("Category deleted Successfully!"));
    }

}
