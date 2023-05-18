import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultAdressComponent } from './result-adress/result-adress.component';
import { SearchAdressComponent } from './search-adress/search-adress.component';
import { MainAdressComponent } from './main-adress/main-adress.component';
import { CreateAdressComponent } from './create-adress/create-adress.component';
import { ViewAdressComponent } from './view-adress/view-adress.component';
import { MaterialModule } from '../material/material.module';
import { AdressService } from './services/adress.service';
import { AdressRoute } from './adress-routes.module';




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