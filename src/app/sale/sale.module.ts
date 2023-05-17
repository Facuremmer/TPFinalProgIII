import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { MainSaleComponent } from './main-sale/main-sale.component';
import { ResultSaleComponent } from './result-sale/result-sale.component';
import { SaleRoute } from './sale-routes.module';
import { SearchSaleComponent } from './search-sale/search-sale.component';
import { SaleService } from './services/sale.service';
import { ViewSaleComponent } from './view-sale/view-sale.component';
import { CustomerService } from '../customer/services/customer.service';


@NgModule({
  declarations: [
    ResultSaleComponent, 
    SearchSaleComponent, 
    MainSaleComponent, 
    CreateSaleComponent, 
    ViewSaleComponent
],


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SaleRoute,
    MaterialModule
  ],
  exports: [
    MainSaleComponent,
    SearchSaleComponent,
    ResultSaleComponent,
  ],
  providers: [
    SaleService,
    CustomerService
  ]
})
export class SaleModule { }