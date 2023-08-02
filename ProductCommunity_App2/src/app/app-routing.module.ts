import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductSearchPageComponent } from './components/product-search-page/product-search-page.component';
import { ResultspageComponent } from './components/resultspage/resultspage.component';
import { ProductGuardService } from './product-guard.service';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { AddreviewComponent } from './components/addreview/addreview.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { ReviewmanagementComponent } from './components/reviewmanagement/reviewmanagement.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'adminlogin',
    component: AdminloginComponent,
    pathMatch: 'full',
  },
  {
    path: 'reviewmanagement',
    component: ReviewmanagementComponent,
    pathMatch: 'full',
    canActivate: [ProductGuardService],
  },
  {
    path: 'productsearch',
    component: ProductSearchPageComponent,
    pathMatch: 'full',
    canActivate: [ProductGuardService],
  },
  {
    path: 'resultspage',
    component: ResultspageComponent,
    pathMatch: 'full',
    canActivate: [ProductGuardService],
  },
  {
    path: 'productdetails',
    component: ProductdetailsComponent,
    pathMatch: 'full',
    canActivate: [ProductGuardService],
  },
  {
    path: 'addreview',
    component: AddreviewComponent,
    pathMatch: 'full',
    canActivate: [ProductGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
