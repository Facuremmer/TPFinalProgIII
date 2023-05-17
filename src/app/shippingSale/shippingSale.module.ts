import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CreateShippingSaleComponent } from './create-shipping-sale/create-shipping-sale.component';
import { MainShippingSaleComponent } from './main-shipping-sale/main-shipping-sale.component';
import { ResultShippingSaleComponent } from './result-shipping-sale/result-shipping-sale.component';
import { SearchShippingSaleComponent } from './search-shipping-sale/search-shipping-sale.component';
import { ShippingSaleService } from './services/shippingSale.service';
import { ShippingSaleRoute } from './shippingSale-routes.module';
import { ViewShippingSaleComponent } from './view-shipping-sale/view-shipping-sale.component';
import { SaleDetailService } from '../saleDetail/services/saleDetail.service';



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