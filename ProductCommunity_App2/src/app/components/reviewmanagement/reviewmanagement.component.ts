import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reviewmanagement',
  templateUrl: './reviewmanagement.component.html',
  styleUrls: ['./reviewmanagement.component.css'],
})
export class ReviewmanagementComponent implements OnInit {
  newReviews: any[] = [];
  error: boolean = false;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchNewReviews();
  }

  fetchNewReviews(): void {
    this.http.get<any[]>('http://localhost:8090/productreview').subscribe(
      (response) => {
        this.newReviews = response;
        console.log(this.newReviews);
      },
      (error) => {
        console.error('Error occurred while fetching new reviews:', error);
      }
    );
  }

  approveReview(review: any): void {
    this.http
      .put<any>(`http://localhost:8090/reviews/${review.id}/approve`, {})
      .subscribe(
        (response: any) => {
          if (response.message === 'Review approved successfully') {
            console.log('Review approved:', response);
            review.approved = true;
            this.snack.open('Review approved successfully', 'Close', {
              duration: 3000,
            });
            this.removeReviewFromList(review);
          } else {
            this.error = true;
          }
        },
        (error) => {
          console.error('Error occurred while approving review:', error);
        }
      );
  }

  rejectReview(review: any): void {
    this.http
      .put<any>(`http://localhost:8090/reviews/${review.id}/reject`, {})
      .subscribe(
        (response: any) => {
          if (response.message === 'Review rejected successfully') {
            console.log('Review rejected:', response);
            review.approved = false;
            this.snack.open('Review rejected successfully', 'Close', {
              duration: 3000,
            });
            this.removeReviewFromList(review);
          } else {
            this.error = true;
          }
        },
        (error) => {
          console.error('Error occurred while rejecting review:', error);
        }
      );
  }
  removeReviewFromList(review: any): void {
    // Find the index of the review in the review list
    const index = this.newReviews.findIndex((r) => r.id === review.id);

    if (index !== -1) {
      // Remove the review from the list
      this.newReviews.splice(index, 1);
    }
  }
}
