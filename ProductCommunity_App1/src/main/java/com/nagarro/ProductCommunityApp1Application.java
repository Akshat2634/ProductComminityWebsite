package com.nagarro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ProductCommunityApp1Application {

	public static void main(String[] args) {
		SpringApplication.run(ProductCommunityApp1Application.class, args);
	}

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}

}
