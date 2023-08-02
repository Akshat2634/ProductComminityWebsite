package com.nagarro.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.entity.Product;
import com.nagarro.entity.ProductReview;

@Repository
public interface ProductReviewRepo extends JpaRepository<ProductReview, Integer> {

	int countByProduct(Product product);

	List<ProductReview> findByApprovedFalse();

	List<ProductReview> findByApprovedTrue();

	int countByApprovedTrue();

}
