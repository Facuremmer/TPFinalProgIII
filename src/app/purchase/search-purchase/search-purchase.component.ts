import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-search-purchase',
  templateUrl: './search-purchase.component.html',
})
export class SearchPurchaseComponent {

  urlCreate:string = environment.apiUri + "/Compra/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.purchaseService.record;
  } 

  constructor(private purchaseService:PurchaseService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.purchaseService.searchAllPurchases();
  } 
 
  SearchByItem (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.purchaseService.SearchPurchaseByItem(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.purchaseService.SearchPurchaseByItem(argument);
   }

  Clear(){
    this.purchaseService.clearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['Compra/agregar'])
  }


}
