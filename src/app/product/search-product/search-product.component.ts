import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styles: [
  ]
})

export class SearchProductComponent  {

  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;
  //@ViewChild("buttonBuscar") buttonBuscar!:ElementRef<HTMLInputElement>;
  //@ViewChild("buttonClear") buttonClear!:ElementRef<HTMLInputElement>

  get record(){
    return this.prodService.record;
  } 

  constructor(private prodService:ProductService,
              private location: Location){

  }
 
   SearchAll (){
    //const value = this.buttonBuscar.nativeElement;
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
    //const value = this.buttonClear.nativeElement;
    this.prodService.ClearRecord();
   }

   goBack():void{
    this.location.back()
  }

}