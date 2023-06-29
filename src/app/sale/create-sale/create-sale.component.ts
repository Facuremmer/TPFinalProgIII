import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomerService } from 'src/app/customer/services/customer.service';
import { CustomerUpdate } from 'src/app/customer/interfaces/customerUpdate.interface';
import { SaleCreate } from '../interfaces/saleCreate.interface';
import { SaleService } from '../services/sale.service';
import { Product } from 'src/app/product/interfaces/product.interface';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'app-create-sale',
  templateUrl: './create-sale.component.html',
  styleUrls: ['./create-sale.component.css']
})
export class CreateSaleComponent implements OnInit {

  public saleDetails: FormArray;
  customers: CustomerUpdate[] = [];
  products: Product[] = [];

  miForm = this.formBuilder.group({
    idCliente: [, Validators.required],
    sucursalVenta: [, Validators.required],
    fecha: [, Validators.required],
    totalVenta: [, [Validators.min(0)]],
    detallesVenta: this.formBuilder.array([])
  });

  constructor(
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private productService: ProductService
  ) {
    this.saleDetails = this.miForm.get('detallesVenta') as FormArray;
  }

  ngOnInit(): void {
    this.customerService.SearchAllId().subscribe((resp) => {
      this.customers = resp;
    });
    this.productService.SearchAllProductsOptions().subscribe((resp) => {
      this.products = resp;
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
      totalVenta: this.calculateTotalVenta(),
      detallesVenta: this.saleDetails.value.map((detail: any) => {
        return {
          idProducto: Number(detail.idProducto),
          precio: Number(detail.precio),
          cantidad: Number(detail.cantidad),
          descuento: Number(detail.descuento),
          recargo: Number(detail.recargo)
        };
      })
    };

    this.saleService.create(newSale).subscribe(
      () => {
        this.miForm.reset();
        this.saleDetails.clear();
        this._snackBar.open('La venta fue agregada con éxito', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        console.log(error);
        this._snackBar.open('Error al agregar la venta', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  calculateTotalVenta(): number {
    let total = 0;

    for (const detalleVenta of this.saleDetails.controls) {
      const cantidad = Number(detalleVenta.get('cantidad')?.value || 0);
      const precio = Number(detalleVenta.get('precio')?.value || 0);

      total += cantidad * precio;
    }

    return total;
  }

  addSaleDetail() {
    const saleDetailGroup = this.formBuilder.group({
      idProducto: [, Validators.required],
      precio: [, [Validators.required, Validators.min(0)]],
      cantidad: [, [Validators.required, Validators.min(0)]],
      descuento: [, [Validators.min(0)]],
      recargo: [, [Validators.min(0)]]
    });

    this.saleDetails.push(saleDetailGroup);
  }

  removeSaleDetail(index: number) {
    this.saleDetails.removeAt(index);
  }

  goBack(): void {
    this.location.back();
  }
}