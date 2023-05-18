import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CreateShippingPurchaseComponent } from './create-shipping-purchase/create-shipping-purchase.component';
import { MainShippingPurchaseComponent } from './main-shipping-purchase/main-shipping-purchase.component';
import { ResultShippingPurchaseComponent } from './result-shipping-purchase/result-shipping-purchase.component';
import { SearchShippingPurchaseComponent } from './search-shipping-purchase/search-shipping-purchase.component';
import { ShippingPurchaseService } from './services/shippingPurchase.service';
import { ShippingPurchaseRoute } from './shippingPurchase-routes.module';
import { ViewShippingPurchaseComponent } from './view-shipping-purchase/view-shipping-purchase.component';
import { PurchaseService } from '../purchase/services/purchase.service';
import { PurchaseDetailService } from '../purchaseDetail/services/purchaseDetail.service';





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