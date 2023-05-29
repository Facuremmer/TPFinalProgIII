import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CreateAdressComponent } from './create-adress/create-adress.component';
import { MainAdressComponent } from './main-adress/main-adress.component';
import { MaterialModule } from '../material/material.module';
import { ResultAdressComponent } from './result-adress/result-adress.component';
import { SearchAdressComponent } from './search-adress/search-adress.component';
import { ViewAdressComponent } from './view-adress/view-adress.component';

import { AdressRoute } from './adress-routes.module';
import { AdressService } from './services/adress.service';




@NgModule({
  declarations: [
    ResultAdressComponent, 
    SearchAdressComponent, 
    MainAdressComponent, 
    CreateAdressComponent, 
    ViewAdressComponent
],


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AdressRoute,
    MaterialModule
  ],
  exports: [
    MainAdressComponent,
    ResultAdressComponent, 
    SearchAdressComponent, 
  ],
  providers: [
    AdressService
  ]
})
export class AdressModule { }