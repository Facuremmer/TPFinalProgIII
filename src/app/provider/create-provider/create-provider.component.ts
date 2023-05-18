import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProviderService } from '../services/provider.service';
import { PersonService } from 'src/app/person/services/person-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { PersonDNI } from 'src/app/person/interfaces/personDNI.interface';
import { ProviderCreate } from '../interfaces/providerCreate.interface';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
})
export class CreateProviderComponent {

  miForm = this.formBuilder.group (
    {
      idCuit_Dni: [,[Validators.required, Validators.min(0)]],
      rubro: [,Validators.required],
    }
  )

  persons: PersonDNI[] = [];

  constructor(private formBuilder: FormBuilder,
              private providerService: ProviderService,
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
    return this.miForm.controls.idCuit_Dni.errors &&
           this.miForm.controls.idCuit_Dni.touched; 
    
  }

  save(){
    if (this.miForm.invalid){
      this.miForm.markAllAsTouched();
      return;
    } 

    const newprod: ProviderCreate = {
      dni: this.miForm.controls.idCuit_Dni.value!,
      rubro: this.miForm.controls.rubro.value!,
    }

    this.providerService.create(newprod);

    this.miForm.reset( ); 

    this._snackBar.open('El proveedor fue agregad con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
  }

  goBack():void{
    this.location.back()
  }
}