import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

import { ProductService } from 'src/app/product/services/product.service';
import { SaleService } from 'src/app/sale/services/sale.service';

import { TypeProduct } from 'src/app/product/interfaces/typeProduct.interface';

import { SaleId } from 'src/app/sale/interfaces/saleId.interface';
import { SaleDetailService } from '../services/saleDetail.service';
import { SaleDetailCreate } from '../interfaces/saleDetailaCreate.interface';

@Component({
  selector: 'app-create-sale-detail',
  templateUrl: './create-sale-detail.component.html',
  styleUrls: ['./create-sale-detail.component.css']
})
export class CreateSaleDetailComponent {

  miForm = this.formBuilder.group (
    {
      idVenta: [, [Validators.required, Validators.min(0)]],
      idProducto: [, [Validators.required, Validators.min(0)]],
      precio: [, [Validators.required, Validators.min(0)]],
      cantidad: [, [Validators.required, Validators.min(0)]],
      descuento: [, Validators.min(0) ],
      recargo: [, Validators.min(0)],
    }
  );

  sales: SaleId[] = [];
  products: TypeProduct [] = [];

  constructor(
    private formBuilder: FormBuilder,
    private saleDetailService: SaleDetailService,
    private productService: ProductService,
    private saleService: SaleService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.productService.nameProducts()
    .subscribe((resp) => {
      this.products = resp;
    });
    this.saleService.SearchAllId()
    .subscribe((resp) => {
      this.sales = resp;
    });
  }

  idVentaError() {
    return this.miForm.controls.idVenta.errors && this.miForm.controls.idVenta.touched;
  }

  idProductoError() {
    return this.miForm.controls.idProducto.errors && this.miForm.controls.idProducto.touched;
  }


  save() {
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }

    const newSaleDetail: SaleDetailCreate = {
      idVenta: this.miForm.controls.idVenta.value!,
      idProducto:this.miForm.controls.idProducto.value!,
      precio:this.miForm.controls.precio.value!,
      cantidad:this.miForm.controls.cantidad.value!,
      descuento:this.miForm.controls.descuento.value!,
      recargo: this.miForm.controls.recargo.value!,
    };

    this.saleDetailService.create(newSaleDetail);

    this.miForm.reset();

    this._snackBar.open('El detalle de venta fue agregado con éxito', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  goBack(): void {
    this.location.back();
  }
}


