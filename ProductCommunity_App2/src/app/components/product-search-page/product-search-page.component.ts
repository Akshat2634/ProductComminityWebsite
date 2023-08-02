import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search-page',
  templateUrl: './product-search-page.component.html',
  styleUrls: ['./product-search-page.component.css'],
})
export class ProductSearchPageComponent implements OnInit {
  productForm: FormGroup;
  searchResults: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      searchOption: ['name', Validators.required],
      searchQuery: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  searchProducts(): void {
    if (this.productForm.valid) {
      const searchOption = this.productForm.value.searchOption;
      const searchQuery = this.productForm.value.searchQuery;

      let url = '';
      if (searchOption === 'name') {
        url = `http://localhost:8090/search?name=${searchQuery}`;
      } else if (searchOption === 'code') {
        url = `http://localhost:8090/search?code=${searchQuery}`;
      } else if (searchOption === 'brand') {
        url = `http://localhost:8090/search?brand=${searchQuery}`;
      }

      this.http.post(url, {}).subscribe(
        (response: any) => {
          this.searchResults = response;
          console.log(response);
          this.snack.open('Product Found', 'Close', {
            duration: 3000,
          });
          this.navigateToResultsPage();
        },
        (error: any) => {
          console.log(error);
          this.searchResults = [];
          this.snack.open('Product Not Found', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  getPlaceholder(): string {
    const searchOption = this.productForm.value.searchOption;
    let placeholder = 'Search by ';

    if (searchOption === 'name') {
      placeholder += 'name';
    } else if (searchOption === 'code') {
      placeholder += 'product code';
    } else if (searchOption === 'brand') {
      placeholder += 'brand';
    }

    return placeholder;
  }
  navigateToResultsPage(): void {
    this.router.navigate(['/resultspage'], {
      queryParams: { results: JSON.stringify(this.searchResults) },
    });
  }

  clearSearch(): void {
    this.productForm.reset();
    this.searchResults = [];
  }
}
