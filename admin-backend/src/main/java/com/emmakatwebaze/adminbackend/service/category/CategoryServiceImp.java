package com.emmakatwebaze.adminbackend.service.category;

import com.emmakatwebaze.adminbackend.entity.Category;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.repository.CategoryRepository;
import com.emmakatwebaze.adminbackend.service.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long categoryId, Category category) {
        Category categoryDB = categoryRepository.findById(categoryId).get();

        if(Objects.nonNull(category.getName()) && !"".equalsIgnoreCase(category.getName())){
            categoryDB.setName(category.getName());
        }

        if(Objects.nonNull(category.getDescription()) && !"".equalsIgnoreCase(category.getDescription())){
            categoryDB.setDescription(category.getDescription());
        }

        return categoryRepository.save(categoryDB);
    }

    @Override
    public List<Category> fetchCategoryList() {
        return categoryRepository.findAll();
    }

    @Override
    public Category fetchCategoryById(Long categoryId) throws ResourceNotFoundException {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if(!category.isPresent()){
            throw new ResourceNotFoundException("Category Not Available");
        }
        return category.get();
    }

    @Override
    public void deleteCategoryById(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

}
