import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductSearchPageComponent } from './components/product-search-page/product-search-page.component';
import { ResultspageComponent } from './components/resultspage/resultspage.component';
import { AuthService } from './auth.service';
import { ProductGuardService } from './product-guard.service';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { AddreviewComponent } from './components/addreview/addreview.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { ReviewmanagementComponent } from './components/reviewmanagement/reviewmanagement.component';
import { FooterComponent } from './components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    ProductSearchPageComponent,
    ResultspageComponent,
    ProductdetailsComponent,
    AddreviewComponent,
    AdminloginComponent,

    ReviewmanagementComponent,
     FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [MatSnackBar, AuthService, ProductGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
