import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./views/main/main.component";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {ManageCustomerComponent} from "./views/manage-customer/manage-customer.component";
import {ManageProductComponent} from "./views/manage-product/manage-product.component";
import {PlaceOrderComponent} from "./views/place-order/place-order.component";
import {ManageCatagoryComponent} from "./views/manage-catagory/manage-catagory.component";
import {LoginComponent} from "./views/login/login.component";
import {NgModule} from "@angular/core";
import {ViewProductComponent} from "./views/view-product/view-product.component";
import {DashComponent} from "./views/dash/dash.component";
import {AdminmainComponent} from "./views/adminmain/adminmain.component";
import {CheckoutComponent} from "./views/checkout/checkout.component";
import {CustomerLoginComponent} from "./views/customer-login/customer-login.component";
import {AuthGuard} from "./guards/auth.guard";

const appAdminRoutes: Routes = [
  {
    path: 'adminmain',
    component: AdminmainComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'manage-customer', component: ManageCustomerComponent},
      {path: 'manage-product', component: ManageProductComponent},
      {path: 'place-order', component: PlaceOrderComponent},
      {path: 'manage-catagory', component: ManageCatagoryComponent},
      {path: 'view-product', component: ViewProductComponent},
      {path: "", pathMatch: 'full', redirectTo: '/adminmain/dashboard'}
    ]
  },
  {path: 'login', component: LoginComponent},
  // {path: '', pathMatch: 'full', redirectTo: '/adminmain/dashboard'},
  {path: '', pathMatch: 'full', redirectTo: '/login'}
];
const appRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {path: 'dash', component: DashComponent},
      {path: 'manage-customer', component: ManageCustomerComponent},
      {path: 'customer-login', component: CustomerLoginComponent},
      {path: 'manage-product', component: ManageProductComponent},
      {path: 'place-order', component: PlaceOrderComponent},
      {path: 'manage-catagory', component: ManageCatagoryComponent},
      {path: 'view-product', component: ViewProductComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: '', pathMatch: 'full', redirectTo: '/main/dash'}
    ]
  },
  // {path: 'login', component: LoginComponent},
  // {path: '', pathMatch: 'full', redirectTo: '/main/dash'},
  // {path: '', pathMatch: 'full', redirectTo: '/login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    RouterModule.forRoot(appAdminRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
