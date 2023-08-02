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

import com.nagarro.entity.Users;
import com.nagarro.repo.UsersRepo;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UsersController {

	@Autowired
	private UsersRepo repo;

	@Autowired
	public UsersController(UsersRepo userRepository) {
		this.repo = userRepository;
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody Users user) {
		// Check if the username already exists
		if (repo.existsById(user.getUname())) {
			return ResponseEntity.badRequest().body("{\"message\": \"Username already exists\"}");
		}

		// Save the new user to the database
		repo.save(user);
		return ResponseEntity.ok("{\"message\": \"User registered successfully\"}");
	}

	@PostMapping(path = "/users")
	public Users addUser(@RequestBody Users user) {
		repo.save(user);
		return user;

	}

	@PutMapping(path = "/users")
	public Users saveorUpdateUsers(@RequestBody Users user) {
		repo.save(user);
		return user;
	}

	@GetMapping(path = "/users")
	public List<Users> getUsers() {
		return repo.findAll();
	}

	@PostMapping(path = "/users/login")
	public ResponseEntity<?> login(@RequestBody Users user) {
		Optional<Users> optionalUser = repo.findById(user.getUname());

		if (optionalUser.isPresent()) {
			Users storedUser = optionalUser.get();
			if (storedUser.getPass().equals(user.getPass())) {
				return ResponseEntity.ok("{\"message\": \"Login successful\"}");
			}
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Invalid username or password\"}");
	}

	@GetMapping("/users/{uname}")
	public Optional<Users> getUser(@PathVariable("uname") String uname) {
		return repo.findById(uname);

	}

	@DeleteMapping("/users/{uname}")
	public void deleteUser(@PathVariable("uname") String uname) {
		Users a = repo.getById(uname);
		repo.delete(a);

	}

}
