package com.emmakatwebaze.adminbackend.service.product;

import com.emmakatwebaze.adminbackend.entity.Product;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;

import java.util.List;

public interface ProductService {

    Product saveProduct(Product product);
    List<Product> fetchProductsList();

    Product fetchProductById(Long productId) throws ResourceNotFoundException;

    Product updateProduct(Long productId, Product product);

    void deleteProductById(Long productId);


}
