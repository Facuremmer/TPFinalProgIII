import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShippingSaleService } from '../services/shippingSale.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
 
  /* SearchByBranch (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.shippingSaleService.SearchSaleByBranch(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.shippingSaleService.SearchSaleByBranch(argument);
   } */

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
