import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CreateShippingSaleComponent } from './create-shipping-sale/create-shipping-sale.component';
import { MainShippingSaleComponent } from './main-shipping-sale/main-shipping-sale.component';
import { MaterialModule } from '../material/material.module';
import { ResultShippingSaleComponent } from './result-shipping-sale/result-shipping-sale.component';
import { SaleDetailService } from '../saleDetail/services/saleDetail.service';
import { SearchShippingSaleComponent } from './search-shipping-sale/search-shipping-sale.component';
import { ShippingSaleRoute } from './shippingSale-routes.module';
import { ShippingSaleService } from './services/shippingSale.service';
import { ViewShippingSaleComponent } from './view-shipping-sale/view-shipping-sale.component';




@NgModule({
  declarations: [
    ResultShippingSaleComponent, 
    SearchShippingSaleComponent, 
    MainShippingSaleComponent, 
    CreateShippingSaleComponent, 
    ViewShippingSaleComponent
],


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ShippingSaleRoute,
    MaterialModule
  ],
  exports: [
    MainShippingSaleComponent,
    SearchShippingSaleComponent,
    ResultShippingSaleComponent,
  ],
  providers: [
    ShippingSaleService,
    SaleDetailService
  ]
})
export class ShippingSaleModule { }