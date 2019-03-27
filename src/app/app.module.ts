import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DashComponent } from './views/dash/dash.component';
import { LoginComponent } from './views/login/login.component';
import { PlaceOrderComponent } from './views/place-order/place-order.component';
import { ManageCustomerComponent } from './views/manage-customer/manage-customer.component';
import { ManageProductComponent } from './views/manage-product/manage-product.component';
import { ManageCatagoryComponent } from './views/manage-catagory/manage-catagory.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CategorieService} from "./services/categorie.service";
import {MainUrlService} from "./services/main-url.service";
import { NgxPaginationModule } from 'ngx-pagination';
import {DatePipe} from "@angular/common";
import {ProductService} from "./services/products.service";
import {ViewProductComponent} from "./views/view-product/view-product.component";
import {AdminmainComponent} from "./views/adminmain/adminmain.component";
import {CheckoutComponent} from "./views/checkout/checkout.component";
import {CustomerLoginComponent} from "./views/customer-login/customer-login.component";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import {CustomerService} from "./services/customer.service";
import {CartService} from "./services/cart.service";
import {OrderService} from "./services/order.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AdminmainComponent,
    DashComponent,
    DashboardComponent,
    LoginComponent,
    PlaceOrderComponent,
    CustomerLoginComponent,
    ManageCustomerComponent,
    ManageProductComponent,
    ManageCatagoryComponent,
    CheckoutComponent,
    ViewProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule

  ],

  providers: [
    DatePipe,
    MainUrlService,
    CategorieService,
    CustomerService,
    ProductService,
    CartService,
    OrderService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
