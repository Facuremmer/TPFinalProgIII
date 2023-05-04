import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styles: [
  ]
})
export class SearchProductComponent  {

  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;
  @ViewChild("buttonBuscar") buttonBuscar!:ElementRef<HTMLInputElement>;

  constructor(private prodService:ProductService){

  }
 
   SearchAll (){
    const value = this.buttonBuscar.nativeElement;
    this.prodService.SearchAllProducts();
  } 
 
  SearchByName (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.prodService.SearchProductByName(value);
    this.txtBuscar.nativeElement.value = '';
  } 

}