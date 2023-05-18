import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { CreateSaleDetailComponent } from './create-sale-detail/create-sale-detail.component';
import { MainSaleDetailComponent } from './main-sale-detail/main-sale-detail.component';
import { ResultSaleDetailComponent } from './result-sale-detail/result-sale-detail.component';
import { SaleDetailRoute } from './saleDetail-routes.module';
import { SearchSaleDetailComponent } from './search-sale-detail/search-sale-detail.component';
import { SaleDetailService } from './services/saleDetail.service';
import { ViewSaleDetailComponent } from './view-sale-detail/view-sale-detail.component';
import { SaleService } from '../sale/services/sale.service';


@NgModule({
  declarations: [
    ResultSaleDetailComponent, 
    SearchSaleDetailComponent, 
    MainSaleDetailComponent, 
    CreateSaleDetailComponent, 
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