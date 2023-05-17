import { Component } from '@angular/core';
import { Person } from '../interfaces/person.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { PersonService } from '../services/person-service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
})
export class CreatePersonComponent {

  miForm = this.formBuilder.group (
    {
      idCuit_Dni:[,[Validators.required, Validators.min(3000000), Validators.max(99999999999)]],
      nombreCompleto: [,Validators.required, ],
    }
  )


  constructor(private formBuilder: FormBuilder,
              private personService: PersonService,
              private _snackBar: MatSnackBar,
              private location: Location){ }

  ngOnInit(): void { 
  }

  DNIError(){
    return this.miForm.controls.idCuit_Dni.errors &&
           this.miForm.controls.idCuit_Dni.touched;
    ; 
    
  }

  save(){
    if (this.miForm.invalid){
      this.miForm.markAllAsTouched();
      return;
    } 

    const newPersn: Person = {

      idCuit_Dni: this.miForm.controls.idCuit_Dni.value!,
      nombreCompleto: this.miForm.controls.nombreCompleto.value!,
    }

    this.personService.create(newPersn);

    this.miForm.reset( ); 

    this._snackBar.open('El producto fue agregado con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
  }

  goBack():void{
    this.location.back()
  }
}
