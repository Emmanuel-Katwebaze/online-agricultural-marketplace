package com.emmakatwebaze.adminbackend.service.product;

import com.emmakatwebaze.adminbackend.entity.*;
import com.emmakatwebaze.adminbackend.entity.Product;
import com.emmakatwebaze.adminbackend.entity.Category;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.repository.CategoryRepository;
import com.emmakatwebaze.adminbackend.repository.ProductRepository;
import com.emmakatwebaze.adminbackend.repository.CategoryRepository;
import com.emmakatwebaze.adminbackend.service.product.ProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProductServiceImp implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Product saveProduct(Product product) {
        // Fetch the Category entity from the database
        Category category = categoryRepository.findById(product.getCategory().getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + product.getCategory().getCategoryId()));

        // Set the Category instance in the Product
        product.setCategory(category);

        // Save the Product
        return productRepository.save(product);
    }

    @Override
    public List<Product> fetchProductsList() {
        return productRepository.findAll();
    }

    @Override
    public Product fetchProductById(Long productId) throws ResourceNotFoundException {
        Optional<Product> product = productRepository.findById(productId);
        if(!product.isPresent()){
            throw new ResourceNotFoundException("Product Not Available");
        }
        return product.get();
    }

    @Override
    public Product updateProduct(Long productId, Product product) {
        Product productDB = productRepository.findById(productId).get();

        if (product.getCategory() != null) {
            // Assuming you have a method to fetch the category by ID from the repository
            Category updatedCategory = categoryRepository.findById(product.getCategory().getCategoryId()).orElse(null);
            if (updatedCategory != null) {
                productDB.setCategory(updatedCategory);
            }
        }

        if(Objects.nonNull(product.getName()) && !"".equalsIgnoreCase(product.getName())){
            productDB.setName(product.getName());
        }

        if(Objects.nonNull(product.getDescription()) && !"".equalsIgnoreCase(product.getDescription())){
            productDB.setDescription(product.getDescription());
        }

        if (product.getPrice() != null && product.getPrice() > 0) {
            productDB.setPrice(product.getPrice());
        }

        if (product.getQuantity() != null && product.getQuantity() > 0) {
            productDB.setQuantity(product.getQuantity());
        }

        if(Objects.nonNull(product.getImageUrl()) && !"".equalsIgnoreCase(product.getImageUrl())){
            productDB.setImageUrl(product.getImageUrl());
        }

        if(Objects.nonNull(product.getDateAdded()) && !"".equalsIgnoreCase(product.getDateAdded())){
            productDB.setDateAdded(product.getDateAdded());
        }


        return productRepository.save(productDB);
    }

    @Override
    public void deleteProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + productId));

        // Remove the association with the user
        product.setCategory(null);

        productRepository.delete(product);
    }
}
