import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { ResultCustomerComponent } from './result-customer/result-customer.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { MainCustomerComponent } from './main-customer/main-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { CustomerService } from './services/customer.service';
import { CustomerRoute } from './customer-routes.module';
import { PersonModule } from '../person/person.module';


@NgModule({
  declarations: [
    ResultCustomerComponent, 
    SearchCustomerComponent, 
    MainCustomerComponent, 
    CreateCustomerComponent, 
    ViewCustomerComponent
],


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CustomerRoute,
    MaterialModule,
    PersonModule
  ],
  exports: [
    MainCustomerComponent,
    SearchCustomerComponent,
    ResultCustomerComponent,
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule { }