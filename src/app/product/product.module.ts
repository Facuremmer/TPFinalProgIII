import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CreateProductComponent } from './create-product/create-product.component';
import { CreateTypeProductComponent } from './create-type-product/create-type-product.component';
import { MainProductComponent } from './main-product/main-product.component';
import { MaterialModule } from '../material/material.module';
import { ProductService } from './services/product.service';
import { ResultProductComponent } from './result-product/result-product.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { ViewProductComponent } from './view-product/view-product.component';

import { ProductRoute } from './product-routes.module';


@NgModule({
  declarations: [
    ResultProductComponent, 
    SearchProductComponent, 
    MainProductComponent, 
    CreateProductComponent, 
    ViewProductComponent,
    CreateTypeProductComponent],


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