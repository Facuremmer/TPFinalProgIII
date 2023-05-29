import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerRoute } from './customer-routes.module';
import { CustomerService } from './services/customer.service';
import { MainCustomerComponent } from './main-customer/main-customer.component';
import { MaterialModule } from '../material/material.module';
import { PersonModule } from '../person/person.module';
import { ResultCustomerComponent } from './result-customer/result-customer.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';


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