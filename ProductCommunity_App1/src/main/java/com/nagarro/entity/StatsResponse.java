package com.nagarro.entity;

public class StatsResponse {
	private int userCount;
	private int productCount;
	private int reviewCount;

	public StatsResponse(int userCount, int productCount, int reviewCount) {
		this.userCount = userCount;
		this.productCount = productCount;
		this.reviewCount = reviewCount;
	}

	public StatsResponse() {
		super();
	}

	public int getUserCount() {
		return userCount;
	}

	public int getProductCount() {
		return productCount;
	}

	public int getReviewCount() {
		return reviewCount;
	}

}
