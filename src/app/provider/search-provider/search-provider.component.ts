import { Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-search-provider',
  templateUrl: './search-provider.component.html',
})
export class SearchProviderComponent {

  urlCreate:string = environment.apiUri + "/Proveedor/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.providerService.record;
  } 

  constructor(private providerService:ProviderService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.providerService.SearchAllProvider();
    console.log(this.providerService.SearchAllProvider())
  } 
 
  SearchByName (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.providerService.SearchProviderByName(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.providerService.SearchProviderByName(argument);
   }

  Clear(){
    this.providerService.ClearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['Proveedor/agregar'])
  }


}
