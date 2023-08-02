package com.nagarro.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.entity.Admin;
import com.nagarro.repo.AdminRepo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
	@Autowired
	AdminRepo adminRepository;

	@Autowired
	public AdminController(AdminRepo adminRepository) {
		this.adminRepository = adminRepository;
	}

	@PostMapping("/admin/login")
	public ResponseEntity<String> adminLogin(@RequestBody Admin loginRequest) {
		Optional<Admin> adminOptional = adminRepository.findByUsername(loginRequest.getUsername());
		if (adminOptional.isPresent()) {
			Admin admin = adminOptional.get();
			if (admin.getPassword().equals(loginRequest.getPassword())) {
				return ResponseEntity.ok("{\"message\": \"Authentication successful\"}");
			}
		}
		// Authentication failed
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Authentication failed\"}");
	}

	@PostMapping("/admin")
	public ResponseEntity<String> addAdmin(@RequestBody Admin admin) {
		Optional<Admin> existingAdmin = adminRepository.findByUsername(admin.getUsername());
		if (existingAdmin.isPresent()) {
			return ResponseEntity.badRequest().body("Username already exists");
		}

		adminRepository.save(admin);
		return ResponseEntity.ok("Admin added successfully");
	}

	@GetMapping("/admin/{adminId}")
	public ResponseEntity<Admin> getAdminDetails(@PathVariable("adminId") int adminId) {
		// Retrieve admin details from the repository
		Optional<Admin> adminOptional = adminRepository.findById(adminId);

		if (adminOptional.isPresent()) {
			// Admin found, return it as a response
			Admin admin = adminOptional.get();
			return ResponseEntity.ok(admin);
		} else {
			// Admin not found, return 404 Not Found status
			return ResponseEntity.notFound().build();
		}
	}

}
