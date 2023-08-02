import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private snack: MatSnackBar
  ) {
    this.registrationForm = this.formBuilder.group(
      {
        uname: ['', [Validators.required, Validators.email]],
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        pass: ['', Validators.required],
        confirmPass: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get uname() {
    return this.registrationForm.get('uname');
  }

  get fname() {
    return this.registrationForm.get('fname');
  }

  get lname() {
    return this.registrationForm.get('lname');
  }

  get pass() {
    return this.registrationForm.get('pass');
  }

  get confirmPass() {
    return this.registrationForm.get('confirmPass');
  }

  ngOnInit(): void {}

  register(): void {
    // Perform login logic here
    const username = this.registrationForm.value.uname;
    const firstname = this.registrationForm.value.fname;
    const lastname = this.registrationForm.value.lname;
    const password = this.registrationForm.value.pass;

    if (password != null) {
      // Make an HTTP POST request to validate the credentials
      this.http
        .post('http://localhost:8090/register', {
          uname: username,
          fname: firstname,
          lname: lastname,
          pass: password,
        })
        .subscribe(
          (response: any) => {
            // Check if the registration was successful
            if (response.message === 'User registered successfully') {
              // Redirect to the login page
              this.router.navigate(['/login']);
              console.log(response.message);
              this.snack.open('Registration successful', 'Close', {
                duration: 3000,
              });
            } else {
              // Registration failed, display error
              this.error = true;
            }
          },
          (error) => {
            // Error occurred, display error
            console.error('Error occurred:', error);
            this.error = true;
            this.snack.open(
              'Registration failed, Email Id already exist.',
              'Close',
              {
                duration: 3000,
              }
            );
            this.registrationForm.reset();
          }
        );
    }
  }

  clearForm(): void {
    this.registrationForm.reset();
    this.error = false;
  }

  passwordMatchValidator(
    control: AbstractControl<any>
  ): { [key: string]: boolean } | null {
    const password = control.get('pass');
    const confirmPassword = control.get('confirmPass');

    if (
      password !== null &&
      confirmPassword !== null &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
