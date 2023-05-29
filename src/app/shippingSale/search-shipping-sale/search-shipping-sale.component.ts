import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ShippingSaleService } from '../services/shippingSale.service';


@Component({
  selector: 'app-search-shipping-sale',
  templateUrl: './search-shipping-sale.component.html',
})
export class SearchShippingSaleComponent {
  urlCreate:string = environment.apiUri + "/EnvioVenta/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.shippingSaleService.record;
  } 

  constructor(private shippingSaleService:ShippingSaleService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.shippingSaleService.searchAllShippingSales();
  } 
  
  Clear(){
    this.shippingSaleService.clearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['EnvioVenta/agregar'])
  }


}
