import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css'],
})
export class AddreviewComponent implements OnInit {
  productCode: number;
  productName: string;
  productBrand: string;
  review: any;
  reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.productCode = 0;
    this.productName = '';
    this.productBrand = '';
    this.review = {
      comment: '',
      rating: null,
    };
    this.reviewForm = this.formBuilder.group({
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(400),
        ],
      ],
      rating: [null, Validators.required],
    });
  }
  goBackToProductDetails(): void {
    this.router.navigate(['/productdetails'], {
      queryParams: { code: this.productCode },
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['code'] && params['name'] && params['brand']) {
        this.productCode = parseInt(params['code'], 10);
        this.productName = params['name'];
        this.productBrand = params['brand'];
      }
    });
  }

  postReview(): void {
    if (this.reviewForm.invalid) {
      return;
    }
    const url = `http://localhost:8090/productreview/${this.productCode}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(this.reviewForm.value);

    this.http.post(url, body, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        this.snackBar.open('Review posted successfully', 'Close', {
          duration: 3000,
        });
        // Reset the review form
        this.reviewForm.reset();
        // Navigate back to product details
        this.router.navigate(['/productdetails'], {
          queryParams: { code: this.productCode },
        });
      },
      (error: any) => {
        console.error('Error posting review:', error);
        this.snackBar.open('Error posting review. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
