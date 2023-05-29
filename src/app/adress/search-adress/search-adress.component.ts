import { AdressService } from '../services/adress.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-adress',
  templateUrl: './search-adress.component.html',
})
export class SearchAdressComponent {

  urlCreate:string = environment.apiUri + "/Dirección/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.adressService.record;
  } 

  constructor(private adressService:AdressService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.adressService.SearchAllAdress();
  } 
 
  SearchByName (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.adressService.SearchAdressByStreet(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.adressService.SearchAdressByStreet(argument);
   }

  Clear(){
    this.adressService.ClearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['Dirección/agregar'])
  }


}