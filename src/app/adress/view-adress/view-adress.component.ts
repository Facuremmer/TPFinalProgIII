import { ActivatedRoute, Router } from '@angular/router';
import { Adress } from '../interfaces/adress.interface';
import { AdressCreate } from '../interfaces/adressCreate.interface';
import { AdressService } from '../services/adress.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/app/person/interfaces/person.interface';
import { PersonService } from 'src/app/person/services/person-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-view-adress',
  templateUrl: './view-adress.component.html',
  styleUrls: ['./view-adress.component.css']
})
export class ViewAdressComponent {
  miForm!: FormGroup;

  
  initForm(): FormGroup {
    return this.formBuilder.group({
      dni: [,Validators.required],
      provincia: [,Validators.required],
      ciudad:[,Validators.required],
      calle:[,Validators.required],
      numero:[,Validators.required],
    })
  }

  
  persons: Person[] = [];
  adress: Adress = {};
  
  constructor (private formBuilder: FormBuilder,
               private activateRoutes: ActivatedRoute,
               private adressSevice: AdressService,
               private personService: PersonService,
               private router: Router,
               private _snackBar: MatSnackBar,
               private location: Location){}

   ngOnInit(): void {
    this.activateRoutes.params
      .pipe(
        switchMap(
          ({idAdr}) => this.adressSevice.SearchAdresstById(idAdr))
        )
        .subscribe(resp => {
          this.adress = resp;
          this.OnPathValueAdress(); 
        })

        this.personService.SearchAllDNI()
        .subscribe(
          resp => {
              this.persons = resp;
          });

          this.miForm = this.initForm();   
  }

    OnPathValueAdress():void {
    this.miForm.patchValue({
      dni: this.adress.dni,
      provincia: this.adress.provincia, 
      ciudad: this.adress.ciudad,
      calle: this.adress.calle,
      numero: this.adress.numero,
    })
  } 

  hasError(field:string){
    return this.miForm.controls[field].errors &&
           this.miForm.controls[field].touched;
    
  }

  save(){
    if (this.miForm.invalid){
      this.miForm.markAllAsTouched();
      return;
    } 
  

   const newprod: AdressCreate = {

     dni: this.miForm.controls['dni'].value,
     provincia: this.miForm.controls['provincia'].value,
     ciudad: this.miForm.controls['ciudad'].value,
     calle: this.miForm.controls['calle'].value,
     numero: this.miForm.controls['numero'].value,
   }

   this.adressSevice.edit(newprod);

   this.router.navigate(['productos/buscar'])

   this._snackBar.open('La dirección fue editada con exito', '',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition:'bottom'
    })
  }

  goBack():void{
    this.location.back()
  }
}
