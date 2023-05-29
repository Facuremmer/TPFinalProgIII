import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PurchaseDetailId } from 'src/app/purchaseDetail/interfaces/purchaseDetailId.interface';
import { PurchaseDetailService } from 'src/app/purchaseDetail/services/purchaseDetail.service';

import { ShippingPurchaseCreateOrUpdate } from '../interfaces/shippingPurchaseCreateOrUpdate.interface';
import { ShippingPurchaseService } from '../services/shippingPurchase.service';

@Component({
  selector: 'app-create-shipping-purchase',
  templateUrl: './create-shipping-purchase.component.html',
  styleUrls: ['./create-shipping-purchase.component.css']
})
export class CreateShippingPurchaseComponent {

  miForm = this.formBuilder.group (
    {
      idCodigoDeSeguimiento: [, [Validators.required, Validators.min(0)]],
      idDetalleCompra:  [, Validators.required],
      correo: [, Validators.required],
      sucursal: [, Validators.required],
    } 
  );

  purchaseDetails: PurchaseDetailId[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private purchaseDetailService: PurchaseDetailService,
    private shippingPurchaseService: ShippingPurchaseService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.purchaseDetailService.SearchAllId()
    .subscribe((resp) => {
      this.purchaseDetails = resp;
    });
  }

  idDetalleCompraError() {
    return this.miForm.controls.idDetalleCompra.errors && this.miForm.controls.idDetalleCompra.touched;
  }

  save() {
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }

    const newSaleDetail: ShippingPurchaseCreateOrUpdate = {
      idCodigoDeSeguimiento: this.miForm.controls.idCodigoDeSeguimiento.value!,
      idDetalleCompra:this.miForm.controls.idDetalleCompra.value!,
      correo:this.miForm.controls.correo.value!,
      sucursal:this.miForm.controls.sucursal.value!,

    };

    console.log(newSaleDetail)

    this.shippingPurchaseService.create(newSaleDetail);

    this.miForm.reset();

    this._snackBar.open('El envio de la compra  fue agregado con éxito', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  goBack(): void {
    this.location.back();
  }
}
