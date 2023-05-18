import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerService } from '../services/customer.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
})
export class SearchCustomerComponent {

  urlCreate:string = environment.apiUri + "/Clientes/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.customerService.record;
  } 

  constructor(private customerService:CustomerService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.customerService.searchAllCustomers();
  } 
 
  SearchByName (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.customerService.SearchCustomerByName(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.customerService.SearchCustomerByName(argument);
   }

  Clear(){
    this.customerService.clearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['Clientes/agregar'])
  }


}
