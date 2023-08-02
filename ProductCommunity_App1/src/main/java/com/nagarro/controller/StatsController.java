package com.nagarro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.entity.StatsResponse;
import com.nagarro.repo.ProductRepo;
import com.nagarro.repo.ProductReviewRepo;
import com.nagarro.repo.UsersRepo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StatsController {
	@Autowired
	private UsersRepo userRepository;

	@Autowired
	private ProductRepo productRepository;

	@Autowired
	private ProductReviewRepo reviewRepository;

	@GetMapping(path = "/stats")
	public ResponseEntity<StatsResponse> getStats() {
		int userCount = (int) userRepository.count();
		int productCount = (int) productRepository.count();
		int reviewCount = reviewRepository.countByApprovedTrue();

		StatsResponse statsResponse = new StatsResponse(userCount, productCount, reviewCount);
		return ResponseEntity.ok(statsResponse);
	}

}
