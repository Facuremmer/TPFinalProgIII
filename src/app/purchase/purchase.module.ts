import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CreatePurchaseComponent } from './create-purchase/create-purchase.component';
import { MainPurchaseComponent } from './main-purchase/main-purchase.component';
import { MaterialModule } from '../material/material.module';
import { PurchaseRoute } from './purchase-routes.module';
import { PurchaseService } from './services/purchase.service';
import { ResultPurchaseComponent } from './result-purchase/result-purchase.component';
import { SearchPurchaseComponent } from './search-purchase/search-purchase.component';
import { ViewPurchaseComponent } from './view-purchase/view-purchase.component';



@NgModule({
  declarations: [
    ResultPurchaseComponent, 
    SearchPurchaseComponent, 
    MainPurchaseComponent, 
    CreatePurchaseComponent, 
    ViewPurchaseComponent
],


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PurchaseRoute,
    MaterialModule
  ],
  exports: [
    MainPurchaseComponent,
    SearchPurchaseComponent,
    ResultPurchaseComponent,
  ],
  providers: [
    PurchaseService
  ]
})
export class PurchaseModule { }