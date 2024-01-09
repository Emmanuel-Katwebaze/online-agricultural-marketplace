package com.emmakatwebaze.adminbackend.service.review;

import com.emmakatwebaze.adminbackend.entity.Review;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;

import java.util.List;

public interface ReviewService {
    Review saveReview(Review review);

    List<Review> fetchReviewsList();

    Review fetchReviewById(Long reviewId) throws ResourceNotFoundException;

    Review updateReview(Long reviewId, Review review);

    void deleteReviewById(Long reviewId);
}
