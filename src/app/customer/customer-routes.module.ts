import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCustomerComponent } from './main-customer/main-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';




const routes: Routes = [
  {
    path: 'buscar',
    component: MainCustomerComponent,
  },
  {
    path: 'agregar',
    component: CreateCustomerComponent,
  },
  {
    path: 'edit-customer/:customerId',
    component: ViewCustomerComponent
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomerRoute { }