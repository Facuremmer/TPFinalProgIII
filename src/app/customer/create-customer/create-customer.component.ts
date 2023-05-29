import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomerCreate } from '../interfaces/customerCreate.interface';
import { CustomerService } from '../services/customer.service';

import { PersonDNI } from 'src/app/person/interfaces/personDNI.interface';
import { PersonService } from 'src/app/person/services/person-service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  miForm = this.formBuilder.group (
    {
      dni: [, Validators.required],
    }
  );

  persons: PersonDNI[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private personService: PersonService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.personService.SearchAllDNI().subscribe((resp) => {
      this.persons = resp;
    });
  }

  dniError() {
    return this.miForm.controls.dni.errors && this.miForm.controls.dni.touched;
  }

  save() {
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }

    const newCustomer: CustomerCreate = {
      idCuit_Dni: this.miForm.controls.dni.value!,
    };

    this.customerService.create(newCustomer);

    this.miForm.reset();

    this._snackBar.open('El cliente fue agregado con éxito', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  goBack(): void {
    this.location.back();
  }
}

