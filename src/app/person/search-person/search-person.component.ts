import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { PersonService } from '../services/person-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-person',
  templateUrl: './search-person.component.html',
})
export class SearchPersonComponent {
  urlCreate:string = environment.apiUri + "/Productos/agregar";
  
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;

  get record(){
    return this.persnService.record;
  } 

  constructor(private persnService:PersonService,
              private location: Location,
              private  router: Router){

  }
 
   SearchAll (){
    this.persnService.SearchAllPerson();
  } 
 
  SearchByName (){
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim()==='') return;
    this.persnService.SearchPersonByName(value);
    this.txtBuscar.nativeElement.value = ''; 
  } 

  search(argument: string){
    this.persnService.SearchPersonByName(argument);
   }

  Clear(){
    this.persnService.ClearRecord();
   }

   goBack():void{
    this.location.back()
  }

  goCreate(): void{
    this.router.navigate(['persona/agregar'])
  }

}
