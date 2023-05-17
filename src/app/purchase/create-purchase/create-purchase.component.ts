import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseCreate } from '../interfaces/purchaseCreate.interface';
import { ProviderId } from 'src/app/provider/interfaces/providerId.interface';
import { ProviderService } from 'src/app/provider/services/provider.service';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
})
export class CreatePurchaseComponent implements OnInit {

  miForm = this.formBuilder.group (
    {
      idProveedor: [, Validators.required],
      totalCompra: [, [Validators.required, Validators.min(0)]],
      fecha: [, Validators.required],
    }
  );

  providers: ProviderId[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private purchaseService: PurchaseService,
    private providerService: ProviderService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.providerService.SearchAllId()
    .subscribe((resp) => {
      this.providers = resp;
      console.log(resp)
    });
  }

  providerIdError() {
    return (
      this.miForm.controls.idProveedor.errors &&
      this.miForm.controls.idProveedor.touched
    );
  }

  save() {
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }

    const newPurchase: PurchaseCreate = {
      idProveedor: this.miForm.controls.idProveedor.value!,
      totalCompra: this.miForm.controls.totalCompra.value!,
      fecha: this.miForm.controls.fecha.value!,
    };

    this.purchaseService.create(newPurchase);

    this.miForm.reset();

    this._snackBar.open('La compra fue agregada con éxito', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  goBack(): void {
    this.location.back();
  }
}

