import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent implements OnInit {
  loginForm: FormGroup;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private snack: MatSnackBar
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

    this.http
      .post('http://localhost:8090/admin/login', {
        username: username,
        password: password,
      })
      .subscribe(
        (response: any) => {
          if (response.message === 'Authentication successful') {
            this.router.navigate(['/reviewmanagement']);
            console.log(response.message);
            this.snack.open('Login successful', 'Close', {
              duration: 3000,
            });
            this.authService.login();
          } else {
            this.error = true;
          }
        },
        (error) => {
          console.error('Error occurred:', error);
          this.error = true;
          this.snack.open('Wrong Credentials', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  clearForm(): void {
    this.loginForm.reset();
    this.authService.logout();
    this.error = false;
  }
}
