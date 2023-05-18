import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShippingPurchaseService } from '../services/shippingPurchase.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-shipping-purchase',
  templateUrl: './search-shipping-purchase.component.html',
})
export class SearchShippingPurchaseComponent {
  urlCreate:string = environment.apiUri + "/EnvioCompra/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.shippingPurchaseService.record;
  } 

  constructor(private shippingPurchaseService:ShippingPurchaseService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.shippingPurchaseService.searchAllShippingPurchases();
  } 
 
  /* SearchByBranch (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.shippingPurchaseService.SearchSaleByBranch(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.shippingPurchaseService.SearchSaleByBranch(argument);
   } */

  Clear(){
    this.shippingPurchaseService.clearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['EnvioCompra/agregar'])
  }


}
