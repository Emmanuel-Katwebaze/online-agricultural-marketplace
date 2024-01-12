package com.emmakatwebaze.adminbackend.service.review;

import com.emmakatwebaze.adminbackend.entity.*;
import com.emmakatwebaze.adminbackend.entity.Review;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.repository.ReviewRepository;
import com.emmakatwebaze.adminbackend.repository.ProductRepository;
import com.emmakatwebaze.adminbackend.repository.ReviewRepository;
import com.emmakatwebaze.adminbackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ReviewServiceImp implements ReviewService{
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;
    @Override
    public Review saveReview(Review review) {
        // Fetch the User entity from the database
        User user = userRepository.findById(review.getUser().getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + review.getUser().getUserId()));

        // Set the User instance in the Review
        review.setUser(user);

        // Fetch the Product entity from the database
        Product product = productRepository.findById(review.getProduct().getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + review.getProduct().getProductId()));

        // Set the User instance in the Review
        review.setProduct(product);

        // Save the Review
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> fetchReviewsList() {
        return reviewRepository.findAll();
    }

    @Override
    public Review fetchReviewById(Long reviewId) throws ResourceNotFoundException {
        Optional<Review> review = reviewRepository.findById(reviewId);
        if(!review.isPresent()){
            throw new ResourceNotFoundException("Review Not Available");
        }
        return review.get();
    }

    @Override
    public Review updateReview(Long reviewId, Review review) {
        Review reviewDB = reviewRepository.findById(reviewId).get();

        if (review.getUser() != null) {
            // Assuming you have a method to fetch the category by ID from the repository
            User updatedUser = userRepository.findById(review.getUser().getUserId()).orElse(null);
            if (updatedUser != null) {
                reviewDB.setUser(updatedUser);
            }
        }

        if (review.getProduct() != null) {
            // Assuming you have a method to fetch the category by ID from the repository
            Product updatedProduct = productRepository.findById(review.getProduct().getProductId()).orElse(null);
            if (updatedProduct != null) {
                reviewDB.setProduct(updatedProduct);
            }
        }

        if(Objects.nonNull(review.getComment()) && !"".equalsIgnoreCase(review.getComment())){
            reviewDB.setComment(review.getComment());
        }

        if (review.getRating() != null && review.getRating() > 0) {
            reviewDB.setRating(review.getRating());
        }

        if(Objects.nonNull(review.getDatePosted()) && !"".equalsIgnoreCase(review.getDatePosted())){
            reviewDB.setDatePosted(review.getDatePosted());
        }


        return reviewRepository.save(reviewDB);
    }

    @Override
    public void deleteReviewById(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Review not found with id: " + reviewId));

        // Remove the association with the user
        review.setUser(null);

        // Remove the association with the product
        review.setProduct(null);

        reviewRepository.delete(review);
    }
}
