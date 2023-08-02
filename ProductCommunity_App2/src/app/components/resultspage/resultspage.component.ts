import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultspage',
  templateUrl: './resultspage.component.html',
  styleUrls: ['./resultspage.component.css'],
})
export class ResultspageComponent implements OnInit {
  searchResults: any[];
  filteredResults: any[];
  filterQuery: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.searchResults = [];
    this.filteredResults = [];
    this.filterQuery = '';
  }

  ngOnInit(): void {
    // Get the search results from the route's query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['results']) {
        this.searchResults = JSON.parse(params['results']);
        this.filteredResults = this.searchResults;
      }
    });
  }

  applyFilter(): void {
    const query = this.filterQuery.trim().toLowerCase();
    this.filteredResults = this.searchResults.filter(
      (result) =>
        result.name.toLowerCase().includes(query) ||
        result.productCode.toString().includes(query) ||
        result.brand.toLowerCase().includes(query)
    );
  }
  calculateAverageRating(reviews: any[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }

  clearFilter(): void {
    this.filterQuery = '';
    this.filteredResults = this.searchResults;
  }

  // Function to calculate average rating and convert it to stars
  getRatingStars(averageRating: number): string {
    const roundedRating = Math.round(averageRating); // Round the average rating to the nearest whole number
    const starCount = 5; // Total number of stars

    // Create a string with the specified number of filled stars and empty stars
    const stars =
      '★'.repeat(roundedRating) + '☆'.repeat(starCount - roundedRating);

    return stars;
  }
  navigateToProductDetails(productCode: number): void {
    // Navigate to the product details page using the product code
    this.router.navigate(['/productdetails'], {
      queryParams: { code: productCode },
    });
  }

  getApprovedReviewsCount(reviews: any[]): number {
    const approvedReviews = reviews.filter((review) => review.approved);
    return approvedReviews.length;
  }
}
