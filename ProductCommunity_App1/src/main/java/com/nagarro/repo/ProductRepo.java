package com.nagarro.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.entity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
	List<Product> findByNameContainingIgnoreCase(String name);

	List<Product> findByProductCode(Integer productCode);

	List<Product> findByBrandContainingIgnoreCase(String brand);

	List<Product> findByProductCode(String code);

	boolean existsByProductCode(int productCode);

}
