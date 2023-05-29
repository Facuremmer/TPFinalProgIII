import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-search-sale',
  templateUrl: './search-sale.component.html',
})
export class SearchSaleComponent {

  urlCreate:string = environment.apiUri + "/Ventas/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.saleService.record;
  } 

  constructor(private saleService:SaleService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.saleService.searchAllSales();
  } 
 
  SearchByBranch (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.saleService.SearchSaleByBranch(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.saleService.SearchSaleByBranch(argument);
   }

  Clear(){
    this.saleService.clearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['Ventas/agregar'])
  }
}