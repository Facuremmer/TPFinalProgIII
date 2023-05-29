import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

import { CustomerService } from 'src/app/customer/services/customer.service';
import { CustomerUpdate } from 'src/app/customer/interfaces/customerUpdate.interface';

import { Sale } from '../interfaces/sale.interface';
import { SaleService } from '../services/sale.service';
import { SaleUpdate } from '../interfaces/saleUpdate.interface';

@Component({
  selector: 'app-view-sale',
  templateUrl: './view-sale.component.html',
  styleUrls: ['./view-sale.component.css']
})
export class ViewSaleComponent {
  miForm!: FormGroup;

  
  initForm(): FormGroup {
    return this.formBuilder.group({
      idVenta:[,Validators.required],
      idCliente: [Validators.required],
      sucursalVenta: [,Validators.required],
      fecha: [,Validators.required],
      totalVenta: [,[Validators.required, Validators.min(0)]],
    })
  }

  
  customers: CustomerUpdate[] = [];

  sale: Sale = {};

  constructor (private formBuilder: FormBuilder,
               private activateRoutes: ActivatedRoute,
               private saleService: SaleService,
               private customerService: CustomerService,
               private router: Router,
               private _snackBar: MatSnackBar,
               private location: Location){}

   ngOnInit(): void {
    this.activateRoutes.params
      .pipe(
        switchMap(
          ({saleId}) => this.saleService.searchSaleById(saleId))
        )
        .subscribe(resp => {
          this.sale = resp;
          this.OnPathValuePurchase(); 
        })

        this.customerService.SearchAllId()
        .subscribe(
          resp => {
              this.customers = resp;
          });

          this.miForm = this.initForm();   
  }

    OnPathValuePurchase():void {
    this.miForm.patchValue({
      idVenta:this.sale.idVenta,
      idCliente:this.sale.idCliente, 
      sucursalVenta:this.sale.sucursalVenta, 
      fecha:this.sale.fecha,
      totalVenta: this.sale.totalVenta,
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
  

   const newprod: SaleUpdate = {

      idVenta:this.miForm.controls['idVenta'].value,
      idCliente:this.miForm.controls['idCliente'].value, 
      sucursalVenta:this.miForm.controls['sucursalVenta'].value,
      fecha:this.miForm.controls['fecha'].value,
      totalVenta:this.miForm.controls['totalVenta'].value,
   }

   this.saleService.edit(newprod);

   this.router.navigate(['Ventas/buscar'])

   this._snackBar.open('La venta fue editada con exito', '',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition:'bottom'
    })
  }

  goBack():void{
    this.location.back()
  }
}

