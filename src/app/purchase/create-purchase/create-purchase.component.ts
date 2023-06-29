import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PurchaseCreate } from '../interfaces/purchaseCreate.interface';
import { PurchaseService } from '../services/purchase.service';
import { Product } from 'src/app/product/interfaces/product.interface';
import { ProductService } from 'src/app/product/services/product.service';
import { ProviderId } from 'src/app/provider/interfaces/providerId.interface';
import { ProviderService } from 'src/app/provider/services/provider.service';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.css']
})
export class CreatePurchaseComponent implements OnInit {

  public purchaseDetails: FormArray;
  providers: ProviderId[] = [];
  products: Product[] = [];

  miForm = this.formBuilder.group({
    idProveedor: [, Validators.required],
    totalCompra: [, [Validators.min(0)]],
    fecha: [, Validators.required],
    detallesCompra: this.formBuilder.array([])
  });

  constructor(
    private formBuilder: FormBuilder,
    private purchaseService: PurchaseService,
    private providerService: ProviderService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private productService: ProductService
  ) {
    this.purchaseDetails = this.miForm.get('detallesCompra') as FormArray;
  }

  ngOnInit(): void {
    this.providerService.SearchAllId().subscribe((resp) => {
      this.providers = resp;
    });
    this.productService.SearchAllProductsOptions().subscribe((resp) => {
      this.products = resp;
    });
  }

  idProveedorError() {
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
      totalCompra: this.calculateTotalCompra(),
      fecha: this.miForm.controls.fecha.value!,
      detallesCompra: this.purchaseDetails.value.map((detail: any) => {
        return {
          idProducto: Number(detail.idProducto),
          precio: Number(detail.precio),
          cantidad: Number(detail.cantidad),
          retencion: Number(detail.retencion)
        };
      })
    };

    this.purchaseService.create(newPurchase).subscribe(
      () => {
        this.miForm.reset();
        this.purchaseDetails.clear();
        this._snackBar.open('La compra fue agregada con éxito', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.log(error);
        this._snackBar.open('Error al agregar la compra', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  calculateTotalCompra(): number {
    let total = 0;

    for (const detalleCompra of this.purchaseDetails.controls) {
      const cantidad = Number(detalleCompra.get('cantidad')?.value || 0);
      const precio = Number(detalleCompra.get('precio')?.value || 0);

      total += cantidad * precio;
    }

    return total;
  }

  addPurchaseDetail() {
    const purchaseDetailGroup = this.formBuilder.group({
      idProducto: [, Validators.required],
      precio: [, [Validators.required, Validators.min(0)]],
      cantidad: [, [Validators.required, Validators.min(0)]],
      retencion: [, [Validators.min(0)]]
    });

    this.purchaseDetails.push(purchaseDetailGroup);
  }

  removePurchaseDetail(index: number) {
    this.purchaseDetails.removeAt(index);
  }

  goBack(): void {
    this.location.back();
  }
}
