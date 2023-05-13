import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styles: [
  ]
})

export class SearchProductComponent  {

  urlCreate:string = environment.apiUri + "/Productos/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.prodService.record;
  } 

  constructor(private prodService:ProductService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.prodService.SearchAllProducts();
  } 
 
  SearchByName (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.prodService.SearchProductByName(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.prodService.SearchProductByName(argument);
   }

  Clear(){
    this.prodService.ClearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['productos/agregar'])
  }

  goCreateType(): void{
    this.router.navigate(['productos/agregarTipo'])
  }

}