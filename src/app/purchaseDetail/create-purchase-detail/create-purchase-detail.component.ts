import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductService } from 'src/app/product/services/product.service';
import { PurchaseDetailCreate } from '../interfaces/purchaseDetailCreate.interface';
import { PurchaseDetailService } from '../services/purchaseDetail.service';
import { PurchaseId } from 'src/app/purchase/interfaces/purchaseId.interface';
import { PurchaseService } from 'src/app/purchase/services/purchase.service';
import { TypeProduct } from 'src/app/product/interfaces/typeProduct.interface';

@Component({
  selector: 'app-create-purchase-detail',
  templateUrl: './create-purchase-detail.component.html',
  styleUrls: ['./create-purchase-detail.component.css']
})
export class CreatePurchaseDetailComponent {

  miForm = this.formBuilder.group (
    {
      idCompra: [, [Validators.required, Validators.min(0)]],
      idProducto: [, [Validators.required, Validators.min(0)]],
      precio: [, [Validators.required, Validators.min(0)]],
      cantidad: [, [Validators.required, Validators.min(0)]],
      retencion: [, Validators.min(0)],
    }
  );

  purchases: PurchaseId[] = [];
  products: TypeProduct [] = [];

  constructor(
    private formBuilder: FormBuilder,
    private purchaseDetailService: PurchaseDetailService,
    private productService: ProductService,
    private purchaseService: PurchaseService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.productService.nameProducts()
    .subscribe((resp) => {
      this.products = resp;
    });
    this.purchaseService.SearchAllId()
    .subscribe((resp) => {
      this.purchases = resp;
    });
  }

  idCompraError() {
    return this.miForm.controls.idCompra.errors && this.miForm.controls.idCompra.touched;
  }

  idProductoError() {
    return this.miForm.controls.idProducto.errors && this.miForm.controls.idProducto.touched;
  }


  save() {
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }

    const newSaleDetail: PurchaseDetailCreate = {
      idCompra: this.miForm.controls.idCompra.value!,
      idProducto:this.miForm.controls.idProducto.value!,
      precio:this.miForm.controls.precio.value!,
      cantidad:this.miForm.controls.cantidad.value!,
      retencion: this.miForm.controls.retencion.value!,
    };

    this.purchaseDetailService.create(newSaleDetail);

    this.miForm.reset();

    this._snackBar.open('El detalle de compra fue agregado con éxito', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  goBack(): void {
    this.location.back();
  }
}
