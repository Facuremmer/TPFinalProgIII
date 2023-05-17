import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { CreatePurchaseDetailComponent } from './create-purchase-detail/create-purchase-detail.component';
import { MainPurchaseDetailComponent } from './main-purchase-detail/main-purchase-detail.component';
import { PurchaseDetailRoute } from './purchaseDetail-routes.module';
import { ResultPurchaseDetailComponent } from './result-purchase-detail/result-purchase-detail.component';
import { SearchPurchaseDetailComponent } from './search-purchase-detail/search-purchase-detail.component';
import { PurchaseDetailService } from './services/purchaseDetail.service';
import { ViewPurchaseDetailComponent } from './view-purchase-detail/view-purchase-detail.component';
import { PurchaseService } from '../purchase/services/purchase.service';
import { ProductService } from '../product/services/product.service';



@NgModule({
  declarations: [
    ResultPurchaseDetailComponent, 
    SearchPurchaseDetailComponent, 
    MainPurchaseDetailComponent, 
    CreatePurchaseDetailComponent, 
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