import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SaleDetailId } from 'src/app/saleDetail/interfaces/saleDetailId.interface';
import { SaleDetailService } from 'src/app/saleDetail/services/saleDetail.service';
import { ShippingSaleService } from '../services/shippingSale.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { AdressId } from 'src/app/adress/interfaces/adressId.interface';
import { AdressService } from 'src/app/adress/services/adress.service';
import { ShippingSaleCreateOrUpdate } from '../interfaces/shippingSaleCreateOrUpdate.interface';

@Component({
  selector: 'app-create-shipping-sale',
  templateUrl: './create-shipping-sale.component.html',
})
export class CreateShippingSaleComponent {

  miForm = this.formBuilder.group (
    {
      idCodigoDeSeguimiento: [, [Validators.required, Validators.min(0)]],
      idDetalleDeVenta:  [, Validators.required],
      idDireccion: [, Validators.required],
      correo: [, Validators.required],
      sucursal: [, Validators.required],
    } 
  );

  saleDetails: SaleDetailId[] = [];
  adress: AdressId[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private saleDetailService: SaleDetailService,
    private shippingSaleService: ShippingSaleService,
    private adressService: AdressService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.saleDetailService.SearchAllId()
    .subscribe((resp) => {
      this.saleDetails = resp;
    });

    this.adressService.SearchAllId()
    .subscribe((resp) => {
      this.adress = resp;
    });
  }

  idDetalleCompraError() {
    return this.miForm.controls.idDetalleDeVenta.errors && this.miForm.controls.idDetalleDeVenta.touched;
  }

  idDireccionError() {
    return this.miForm.controls.idDireccion.errors && this.miForm.controls.idDireccion.touched;
  }

  save() {
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }

    const newSaleDetail: ShippingSaleCreateOrUpdate = {
      idCodigoDeSeguimiento: this.miForm.controls.idCodigoDeSeguimiento.value!,
      idDetalleDeVenta:this.miForm.controls.idDetalleDeVenta.value!,
      idDireccion:this.miForm.controls.idDireccion.value!,
      correo:this.miForm.controls.correo.value!,
      sucursal:this.miForm.controls.sucursal.value!,

    };

    this.shippingSaleService.create(newSaleDetail);

    this.miForm.reset();

    this._snackBar.open('El envio de la venta fue agregado con éxito', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  goBack(): void {
    this.location.back();
  }
}

