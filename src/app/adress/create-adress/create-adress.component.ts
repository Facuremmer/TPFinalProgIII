import { AdressCreate } from '../interfaces/adressCreate.interface';
import { AdressService } from 'src/app/adress/services/adress.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonDNI } from 'src/app/person/interfaces/personDNI.interface';
import { PersonService } from 'src/app/person/services/person-service';

@Component({
  selector: 'app-create-adress',
  templateUrl: './create-adress.component.html',
  styleUrls: ['./create-adress.component.css']
})

export class CreateAdressComponent implements OnInit {

  miForm = this.formBuilder.group (
    {
      dni:[,Validators.required],
      provincia: [,Validators.required],
      ciudad: [,Validators.required],
      calle: [,Validators.required],
      numero: [,Validators.min(0)]
    }
  )

  persons: PersonDNI[] = [];

  constructor(private formBuilder: FormBuilder,
              private AdressService: AdressService,
              private personService: PersonService,
              private _snackBar: MatSnackBar,
              private location: Location){ }

  ngOnInit(): void { 
    this.personService.SearchAllDNI()
    .subscribe(
      resp => {
          this.persons = resp;
      });
  }

  idPersonError(){
    return this.miForm.controls.dni.errors &&
           this.miForm.controls.dni.touched; 
    
  }

  save(){
    if (this.miForm.invalid){
      this.miForm.markAllAsTouched();
      return;
    } 

    const newprod: AdressCreate = {

      dni: this.miForm.controls.dni.value!,
      provincia: this.miForm.controls.provincia.value!,
      ciudad: this.miForm.controls.ciudad.value!,
      calle:this.miForm.controls.calle.value!,
      numero:this.miForm.controls.numero.value!
    }

    this.AdressService.create(newprod);

    this.miForm.reset( ); 

    this._snackBar.open('La direccion fue agregada con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
  }

  goBack():void{
    this.location.back()
  }
}