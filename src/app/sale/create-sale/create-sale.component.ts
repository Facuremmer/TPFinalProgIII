import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomerService } from 'src/app/customer/services/customer.service';
import { CustomerUpdate } from 'src/app/customer/interfaces/customerUpdate.interface';
import { SaleCreate } from '../interfaces/saleCreate.interface';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css']
})
export class CreateSaleComponent implements OnInit {

  miForm = this.formBuilder.group (
    {
      idCliente: [, Validators.required],
      sucursalVenta: [, Validators.required],
      fecha: [, Validators.required],
      totalVenta: [, [Validators.required, Validators.min(0)]]
    }
  );

  customers: CustomerUpdate[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.customerService.SearchAllId()
    .subscribe((resp) => {
      this.customers = resp;
    });
  }

  idClienteError() {
    return (
      this.miForm.controls.idCliente.errors &&
      this.miForm.controls.idCliente.touched
    );
  }

  save() {
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }

    const newSale: SaleCreate = {
      idCliente: this.miForm.controls.idCliente.value!,
      sucursalVenta: this.miForm.controls.sucursalVenta.value!,
      fecha: this.miForm.controls.fecha.value!,
      totalVenta: this.miForm.controls.totalVenta.value!,
    };

    this.saleService.create(newSale);

    this.miForm.reset();

    this._snackBar.open('La venta fue agregada con éxito', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  goBack(): void {
    this.location.back();
  }
}

