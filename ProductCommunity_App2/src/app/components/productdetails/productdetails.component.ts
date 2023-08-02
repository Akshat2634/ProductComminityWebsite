import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Review {
  id: number;
  rating: number;
  comment: string;
  approved: boolean;
}
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  productCode: number;
  product: any;
  showReviews: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.productCode = 0;
    this.product = null;
    this.showReviews = false;
  }

  ngOnInit(): void {
    // Get the product code from the query parameter
    this.route.queryParams.subscribe((params) => {
      if (params['code']) {
        this.productCode = parseInt(params['code'], 10);
        // Fetch the product details using the product code
        this.fetchProductDetails();
      }
    });
  }

  fetchProductDetails(): void {
    const url = `http://localhost:8090/product/${this.productCode}`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.product = response;
      },
      (error: any) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
  calculateAverageRatings(reviews: any[]): number {
    const approvedReviews = reviews.filter((review) => review.approved);

    if (!approvedReviews || approvedReviews.length === 0) {
      return 0;
    }

    let totalRating = 0;
    approvedReviews.forEach((review) => {
      totalRating += review.rating;
    });

    return totalRating / approvedReviews.length;
  }
  displayStarRating(rating: number): string {
    const roundedRating = Math.round(rating);
    return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
  }

  navigateToAddReview(): void {
    this.router.navigate(['/addreview'], {
      queryParams: {
        code: this.productCode,
        name: this.product.name,
        brand: this.product.brand,
      },
    });
  }

  toggleReviews(): void {
    this.showReviews = !this.showReviews;
  }
  getApprovedReviewsCount(): number {
    return this.product.reviews.filter((review: Review) => review.approved)
      .length;
  }
}
