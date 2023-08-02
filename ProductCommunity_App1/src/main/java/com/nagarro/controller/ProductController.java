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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.entity.Product;
import com.nagarro.repo.ProductRepo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
	@Autowired
	private ProductRepo repo;

	public ProductController(ProductRepo productRepository) {
		this.repo = productRepository;
	}

	@PostMapping("/search")
	public ResponseEntity<Object> searchProducts(@RequestParam(required = false) String name,
			@RequestParam(required = false) Integer code, @RequestParam(required = false) String brand) {
		List<Product> searchResults;

		if (name != null) {
			searchResults = repo.findByNameContainingIgnoreCase(name);
		} else if (code != null) {
			try {

				searchResults = repo.findByProductCode(code);
			} catch (NumberFormatException e) {
				return ResponseEntity.badRequest().body("Invalid code parameter");
			}
		} else if (brand != null) {
			searchResults = repo.findByBrandContainingIgnoreCase(brand);
		} else {
			// No search parameters provided
			return ResponseEntity.badRequest().body("No search parameters provided");
		}

		if (searchResults.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok().body(searchResults);
	}

	@PostMapping("/product")
	public ResponseEntity<Object> addProduct(@RequestBody Product product) {
		// Check if the product with the given productCode already exists
		if (repo.existsByProductCode(product.getProductCode())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Product already exists");
		}

		// Save the product
		Product savedProduct = repo.save(product);

		return ResponseEntity.ok(savedProduct);
	}

	@PutMapping(path = "/product")
	public Product saveOrUpdateProduct(@RequestBody Product product) {
		repo.save(product);
		return product;

	}

	@GetMapping(path = "/product")
	public List<Product> getBooks() {
		return repo.findAll();
	}

	@GetMapping("/product/{code}")
	public Optional<Product> getBook(@PathVariable("code") int code) {
		return repo.findById(code);

	}

	@DeleteMapping("/product/{code}")
	public void deleteProduct(@PathVariable("code") int code) {
		Product a = repo.getById(code);
		repo.delete(a);

	}

}
