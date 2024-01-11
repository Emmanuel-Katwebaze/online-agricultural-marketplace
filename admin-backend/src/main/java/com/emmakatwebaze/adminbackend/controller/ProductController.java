package com.emmakatwebaze.adminbackend.controller;

import com.emmakatwebaze.adminbackend.api_response.ApiResponse;
import com.emmakatwebaze.adminbackend.entity.Product;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.service.product.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    private final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);
    @PostMapping("/api/products")
    public Product saveProduct(@RequestBody Product product){
        LOGGER.info("Inside saveProduct of ProductController");
        return productService.saveProduct(product);
    }

    @GetMapping("/api/products")
    public List<Product> fetchProductsList(){
        LOGGER.info("Inside fetchProductsList of ProductController");
        return productService.fetchProductsList();
    }

    @GetMapping("/api/products/{id}")
    public Product fetchProductById(@PathVariable("id") Long productId) throws ResourceNotFoundException {
        return productService.fetchProductById(productId);
    }

    @PutMapping("/api/products/{id}")
    public Product updateProduct(@PathVariable("id") Long productId, @RequestBody Product product) {
        return productService.updateProduct(productId, product);
    }

    @DeleteMapping("/api/products/{id}")
    public ResponseEntity<ApiResponse> deleteProductById(@PathVariable("id") Long productId){
        productService.deleteProductById(productId);
        return ResponseEntity.ok(new ApiResponse("Product deleted Successfully!"));
    }


}
