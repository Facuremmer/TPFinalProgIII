import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SaleDetailService } from '../services/saleDetail.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-sale-detail',
  templateUrl: './search-sale-detail.component.html',
})
export class SearchSaleDetailComponent {

  urlCreate:string = environment.apiUri + "/DetalleVenta/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.saleDetailService.record;
  } 

  constructor(private saleDetailService:SaleDetailService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.saleDetailService.searchAllSaleDetails();
  } 
 
  SearchByName (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.saleDetailService.SearchSaleDetailByName(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.saleDetailService.SearchSaleDetailByName(argument);
   }

  Clear(){
    this.saleDetailService.clearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['DetalleVenta/agregar'])
  }

}
