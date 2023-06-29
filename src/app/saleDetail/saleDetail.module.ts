import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainSaleDetailComponent } from './main-sale-detail/main-sale-detail.component';
import { MaterialModule } from '../material/material.module';
import { ResultSaleDetailComponent } from './result-sale-detail/result-sale-detail.component';
import { SaleDetailRoute } from './saleDetail-routes.module';
import { SaleDetailService } from './services/saleDetail.service';
import { SaleService } from '../sale/services/sale.service';
import { SearchSaleDetailComponent } from './search-sale-detail/search-sale-detail.component';
import { ViewSaleDetailComponent } from './view-sale-detail/view-sale-detail.component';



@NgModule({
  declarations: [
    ResultSaleDetailComponent, 
    SearchSaleDetailComponent, 
    MainSaleDetailComponent, 
    ViewSaleDetailComponent
],


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SaleDetailRoute,
    MaterialModule
  ],
  exports: [
    MainSaleDetailComponent,
    SearchSaleDetailComponent,
    ResultSaleDetailComponent,
  ],
  providers: [
    SaleDetailService,
    SaleService
  ]
})
export class SaleDetailModule { }