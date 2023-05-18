import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { PurchaseDetailService } from '../services/purchaseDetail.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-purchase-detail',
  templateUrl: './search-purchase-detail.component.html',
})
export class SearchPurchaseDetailComponent {

  urlCreate:string = environment.apiUri + "/DetalleCompra/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.purchaseDetailService.record;
  } 

  constructor(private purchaseDetailService:PurchaseDetailService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.purchaseDetailService.searchAllPurchaseDetails();
  } 
 
  SearchByName (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.purchaseDetailService.SearchPurchaseDetailByName(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.purchaseDetailService.SearchPurchaseDetailByName(argument);
   }

  Clear(){
    this.purchaseDetailService.clearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['DetalleCompra/agregar'])
  }


}
