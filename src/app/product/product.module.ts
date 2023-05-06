import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ResultProductComponent } from './result-product/result-product.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { MainProductComponent } from './main-product/main-product.component';
import { ProductService } from './services/product.service';
import { CreateProductComponent } from './create-product/create-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ProductRoute } from './product-routes.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ResultProductComponent, 
    SearchProductComponent, 
    MainProductComponent, 
    CreateProductComponent, 
    ViewProductComponent], 


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProductRoute,
    MaterialModule
  ],
  exports: [
    MainProductComponent,
    SearchProductComponent,
    ResultProductComponent,

  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }