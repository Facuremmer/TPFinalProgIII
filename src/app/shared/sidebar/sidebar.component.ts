import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]  
})
export class SidebarComponent  {

  @ViewChild("buttonClear") buttonClear!:ElementRef<HTMLInputElement>;

  get record(){
    return this.prodServices.record;
  } 

 constructor(private prodServices: ProductService){}
 
 search(argument: string){
  this.prodServices.SearchProductByName(argument);
 }

 Clear(){
  const value = this.buttonClear.nativeElement;
  this.prodServices.ClearRecord();
 }

}
