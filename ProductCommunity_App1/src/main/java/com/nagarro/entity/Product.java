package com.nagarro.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "product")
public class Product {

	private String name;
	private String brand;
	@Id
	@Column(unique = true)
	private int productCode;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("product")
	private List<ProductReview> reviews;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public int getProductCode() {
		return productCode;
	}

	public void setProductCode(int productCode) {
		this.productCode = productCode;
	}

	public List<ProductReview> getReviews() {
		return reviews;
	}

	public void setReviews(List<ProductReview> reviews) {
		this.reviews = reviews;
	}

	public Product(String name, String brand, int productCode, List<ProductReview> reviews) {
		super();

		this.name = name;
		this.brand = brand;
		this.productCode = productCode;
		this.reviews = reviews;
	}

	public Product() {
		super();

	}

}
