package com.emmakatwebaze.adminbackend.controller;

import com.emmakatwebaze.adminbackend.entity.Review;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.service.review.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    private final Logger LOGGER = LoggerFactory.getLogger(ReviewController.class);
    @PostMapping("/reviews")
    public Review saveReview(@RequestBody Review review){
        LOGGER.info("Inside saveReview of ReviewController");
        return reviewService.saveReview(review);
    }

    @GetMapping("/reviews")
    public List<Review> fetchReviewsList(){
        LOGGER.info("Inside fetchReviewsList of ReviewController");
        return reviewService.fetchReviewsList();
    }

    @GetMapping("/reviews/{id}")
    public Review fetchReviewById(@PathVariable("id") Long reviewId) throws ResourceNotFoundException {
        return reviewService.fetchReviewById(reviewId);
    }

    @PutMapping("/reviews/{id}")
    public Review updateReview(@PathVariable("id") Long reviewId, @RequestBody Review review) {
        return reviewService.updateReview(reviewId, review);
    }

    @DeleteMapping("/reviews/{id}")
    public String deleteReviewById(@PathVariable("id") Long reviewId){
        reviewService.deleteReviewById(reviewId);
        return "Review deleted Successfully!";
    }
}
