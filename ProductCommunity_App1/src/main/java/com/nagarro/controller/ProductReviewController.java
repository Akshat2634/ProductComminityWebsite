package com.nagarro.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.entity.Product;
import com.nagarro.entity.ProductReview;
import com.nagarro.repo.ProductRepo;
import com.nagarro.repo.ProductReviewRepo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductReviewController {
	@Autowired
	private ProductReviewRepo reviewRepository;
	@Autowired
	private ProductRepo productRepository;

	@PostMapping("/productreview/{productCode}")
	public ResponseEntity<String> createProductReview(@PathVariable("productCode") int productCode,
			@RequestBody ProductReview review) {
		Optional<Product> existingProduct = productRepository.findById(productCode);
		if (!existingProduct.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Product not found\"}");
		}

		Product product = existingProduct.get();
		review.setProduct(product);
		review.setApproved(false);
		reviewRepository.save(review);

		return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"Review created successfully\"}");
	}

	// Create a new review
	@PostMapping(path = "/productreview")
	public ResponseEntity<String> createReview(@RequestBody ProductReview review) {
		long productId = review.getProduct().getProductCode();

		// Check if the product exists
		Optional<Product> existingProduct = productRepository.findById((int) productId);
		if (!existingProduct.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
		}

		review.setApproved(false);
		reviewRepository.save(review);
		return ResponseEntity.status(HttpStatus.CREATED).body("Review created successfully");
	}

	// Approve a review
	@PutMapping(path = "/productreview/{reviewId}/approve")
	public ResponseEntity<String> approveReview(@PathVariable("reviewId") int reviewId) {
		Optional<ProductReview> reviewOptional = reviewRepository.findById(reviewId);
		if (reviewOptional.isPresent()) {
			ProductReview review = reviewOptional.get();
			review.setApproved(true);
			reviewRepository.save(review);
			return ResponseEntity.ok("Review approved successfully");
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// Request a review for a product
	@PostMapping(path = "/productreview/{productId}/request")
	public ResponseEntity<String> requestReview(@PathVariable("productId") int productId) {
		// Check if the product exists
		Optional<Product> productOptional = productRepository.findById((int) productId);
		if (productOptional.isPresent()) {
			Product product = productOptional.get();

			// Check if a review already exists for the product
			Optional<ProductReview> reviewOptional = reviewRepository.findById(productId);
			if (reviewOptional.isPresent()) {
				// Review already exists, return an appropriate response
				return ResponseEntity.badRequest().body("A review already exists for the product");
			} else {
				// Create a new review
				ProductReview review = new ProductReview();
				review.setProduct(product);
				review.setApproved(false);
				reviewRepository.save(review);

				return ResponseEntity.ok("Review requested for product with ID: " + productId);
			}
		} else {
			// Product not found, return an appropriate response
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping(path = "/productreview")
	public ResponseEntity<List<ProductReview>> getAllReviews() {
		List<ProductReview> reviewList = reviewRepository.findAll();
		return ResponseEntity.ok(reviewList);
	}

	@GetMapping(path = "/productreview/{reviewId}")
	public ResponseEntity<ProductReview> getReviewById(@PathVariable("reviewId") Integer reviewId) {
		Optional<ProductReview> reviewOptional = reviewRepository.findById(reviewId);
		if (reviewOptional.isPresent()) {
			ProductReview review = reviewOptional.get();
			return ResponseEntity.ok(review);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping(path = "/productreview/{reviewId}")
	public ResponseEntity<String> deleteReview(@PathVariable("reviewId") int reviewId) {
		if (reviewRepository.existsById(reviewId)) {
			reviewRepository.deleteById(reviewId);
			return ResponseEntity.ok("Review deleted successfully");
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/product/{code}/reviewcount")
	public ResponseEntity<Integer> getReviewCount(@PathVariable("code") int code) {
		Optional<Product> productOptional = productRepository.findById(code);
		if (productOptional.isPresent()) {
			int reviewCount = reviewRepository.countByProduct(productOptional.get());
			return ResponseEntity.ok(reviewCount);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/admin/reviews")
	public List<ProductReview> getNewReviews() {
		return reviewRepository.findByApprovedFalse();
	}

	@PutMapping(path = "/reviews/{reviewId}/approve")
	public ResponseEntity<String> approveReview(@PathVariable("reviewId") Integer reviewId) {
		Optional<ProductReview> reviewOptional = reviewRepository.findById(reviewId);
		if (reviewOptional.isPresent()) {
			ProductReview review = reviewOptional.get();
			review.setApproved(true);
			reviewRepository.save(review);
			return ResponseEntity.ok("{\"message\": \"Review approved successfully\"}");
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping(path = "/reviews/{reviewId}/reject")
	public ResponseEntity<String> rejectReview(@PathVariable("reviewId") Integer reviewId) {
		Optional<ProductReview> reviewOptional = reviewRepository.findById(reviewId);
		if (reviewOptional.isPresent()) {
			ProductReview review = reviewOptional.get();
			review.setApproved(false);
			reviewRepository.save(review);
			return ResponseEntity.ok("{\"message\": \"Review rejected successfully\"}");
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
