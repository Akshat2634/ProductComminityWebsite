import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private snack: MatSnackBar,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      uname: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }

  get uname() {
    return this.loginForm.get('uname');
  }

  get pass() {
    return this.loginForm.get('pass');
  }

  ngOnInit(): void {}

  login(): void {
    const username = this.loginForm.value.uname;
    const password = this.loginForm.value.pass;

    // Make an HTTP POST request to validate the credentials
    this.http
      .post('http://localhost:8090/users/login', {
        uname: username,
        pass: password,
      })
      .subscribe(
        (response: any) => {
          // Check if the login was successful
          if (response.message === 'Login successful') {
            // Redirect to the product search page
            this.router.navigate(['/productsearch']);
            // Print login successful message in the console
            console.log(response.message);
            this.snack.open('Login successful', 'Close', {
              duration: 3000,
            });
            this.authService.login();
          } else {
            // Login failed, display error
            this.error = true;
          }
        },
        (error) => {
          // Error occurred, display error
          console.error('Error occurred:', error);
          this.error = true;
          this.snack.open('Wrong Credentials', 'Close', {
            duration: 3000,
          });
          this.authService.logout();
        }
      );
  }

  clearForm(): void {
    this.loginForm.reset();
    this.error = false;
    this.authService.logout();
  }
}
