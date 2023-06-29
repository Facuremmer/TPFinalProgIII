import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { MainPurchaseDetailComponent } from './main-purchase-detail/main-purchase-detail.component';
import { PurchaseDetailRoute } from './purchaseDetail-routes.module';
import { PurchaseDetailService } from './services/purchaseDetail.service';
import { PurchaseService } from '../purchase/services/purchase.service';
import { ProductService } from '../product/services/product.service';
import { ResultPurchaseDetailComponent } from './result-purchase-detail/result-purchase-detail.component';
import { SearchPurchaseDetailComponent } from './search-purchase-detail/search-purchase-detail.component';
import { ViewPurchaseDetailComponent } from './view-purchase-detail/view-purchase-detail.component';



@NgModule({
  declarations: [
    ResultPurchaseDetailComponent, 
    SearchPurchaseDetailComponent, 
    MainPurchaseDetailComponent, 
    ViewPurchaseDetailComponent
],


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PurchaseDetailRoute,
    MaterialModule
  ],
  exports: [
    MainPurchaseDetailComponent,
    SearchPurchaseDetailComponent,
    ResultPurchaseDetailComponent,
  ],
  providers: [
    PurchaseService,
    PurchaseDetailService,
    ProductService
  ]
})
export class PurchaseDetailModule { }