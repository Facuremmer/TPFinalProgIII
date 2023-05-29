import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CreateShippingPurchaseComponent } from './create-shipping-purchase/create-shipping-purchase.component';
import { MainShippingPurchaseComponent } from './main-shipping-purchase/main-shipping-purchase.component';
import { MaterialModule } from '../material/material.module';
import { PurchaseDetailService } from '../purchaseDetail/services/purchaseDetail.service';
import { PurchaseService } from '../purchase/services/purchase.service';
import { ResultShippingPurchaseComponent } from './result-shipping-purchase/result-shipping-purchase.component';
import { SearchShippingPurchaseComponent } from './search-shipping-purchase/search-shipping-purchase.component';
import { ShippingPurchaseRoute } from './shippingPurchase-routes.module';
import { ShippingPurchaseService } from './services/shippingPurchase.service';
import { ViewShippingPurchaseComponent } from './view-shipping-purchase/view-shipping-purchase.component';






@NgModule({
  declarations: [
    ResultShippingPurchaseComponent, 
    SearchShippingPurchaseComponent, 
    MainShippingPurchaseComponent, 
    CreateShippingPurchaseComponent, 
    ViewShippingPurchaseComponent
],


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ShippingPurchaseRoute,
    MaterialModule
  ],
  exports: [
    MainShippingPurchaseComponent,
    SearchShippingPurchaseComponent,
    ResultShippingPurchaseComponent,
  ],
  providers: [
    ShippingPurchaseService,
    PurchaseService,
    PurchaseDetailService
  ]
})
export class ShippingPurchaseModule { }