import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonDNI } from 'src/app/person/interfaces/personDNI.interface';
import { PersonService } from 'src/app/person/services/person-service';
import { CustomerService } from '../services/customer.service';
import { switchMap } from 'rxjs';
import { Customer } from '../interfaces/customer.interface';
import { CustomerUpdate } from '../interfaces/customerUpdate.interface';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
})
export class ViewCustomerComponent {
  miForm!: FormGroup;

  
  initForm(): FormGroup {
    return this.formBuilder.group({
      idCliente:[Validators.required],
      idCuit_Dni: [,Validators.required],
    })
  }

  
  persons: PersonDNI[] = [];

  customer: Customer = {};

  constructor (private formBuilder: FormBuilder,
               private activateRoutes: ActivatedRoute,
               private PersonSevice: PersonService,
               private customerService: CustomerService,
               private router: Router,
               private _snackBar: MatSnackBar,
               private location: Location){}

   ngOnInit(): void {
    this.activateRoutes.params
      .pipe(
        switchMap(
          ({customerId}) => this.customerService.searchCustomerById(customerId))
        )
        .subscribe(resp => {
          this.customer = resp;
          this.OnPathValueCustomer(); 
        })

        this.PersonSevice.SearchAllDNI()
        .subscribe(
          resp => {
              this.persons = resp;
          });

          this.miForm = this.initForm();   
  }

    OnPathValueCustomer():void {
    this.miForm.patchValue({
      idCliente:this.customer.id,
      idCuit_Dni:this.customer.dni, 
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
  

   const newprod: CustomerUpdate = {

     idCliente: this.miForm.controls['idCliente'].value,
     idCuit_Dni: this.miForm.controls['idCuit_Dni'].value,
   }

   this.customerService.edit(newprod);

   this.router.navigate(['Clientes/buscar'])

   this._snackBar.open('El cliente fue editado con exito', '',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition:'bottom'
    })
  }

  goBack():void{
    this.location.back()
  }
}
