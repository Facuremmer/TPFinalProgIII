import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

import { AdressId } from 'src/app/adress/interfaces/adressId.interface';
import { AdressService } from 'src/app/adress/services/adress.service';

import { SaleDetailId } from 'src/app/saleDetail/interfaces/saleDetailId.interface';
import { SaleDetailService } from 'src/app/saleDetail/services/saleDetail.service';

import { ShippingSale } from '../interfaces/shippingSale.interface';
import { ShippingSaleCreateOrUpdate } from '../interfaces/shippingSaleCreateOrUpdate.interface';
import { ShippingSaleService } from '../services/shippingSale.service';


@Component({
  selector: 'app-view-shipping-sale',
  templateUrl: './view-shipping-sale.component.html',
  styleUrls: ['./view-shipping-sale.component.css']
})
export class ViewShippingSaleComponent {
  miForm!: FormGroup;

  
  initForm(): FormGroup {
    return this.formBuilder.group({
      idCodigoDeSeguimiento:[,Validators.required],
      idDetalleDeVenta: [Validators.required],
      idDireccion:[,Validators.required],
      correo: [,Validators.required],
      sucursal: [,[Validators.required, Validators.min(0)]],
    })
  }

  
  saleDetails: SaleDetailId[] = [];

  adress: AdressId[] = [];

  shippingSale: ShippingSale = {};

  constructor (private formBuilder: FormBuilder,
               private activateRoutes: ActivatedRoute,
               private saleDetailService: SaleDetailService,
               private shippingSaleService: ShippingSaleService,
               private adressService: AdressService,
               private router: Router,
               private _snackBar: MatSnackBar,
               private location: Location){}

   ngOnInit(): void {
    this.activateRoutes.params
      .pipe(
        switchMap(
          ({idDetalleDeVenta}) => this.shippingSaleService.searchShippingSaleById(idDetalleDeVenta))
        )
        .subscribe(resp => {
          this.shippingSale = resp;
          this.OnPathValuePurchase(); 
        })

        this.saleDetailService.SearchAllId()
        .subscribe(
          resp => {
              this.saleDetails = resp;
          });

          this.adressService.SearchAllId()
        .subscribe(
          resp => {
              this.adress = resp;
          });
          
          this.miForm = this.initForm();   
  }

    OnPathValuePurchase():void {
    this.miForm.patchValue({
      idCodigoDeSeguimiento:this.shippingSale.idCodigoDeSeguimiento,
      idDetalleDeVenta:this.shippingSale.idDetalleDeVenta,
      idDireccion:this.shippingSale.idDireccion,
      correo:this.shippingSale.correo,
      sucursal:this.shippingSale.sucursal,
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
  

   const newprod: ShippingSaleCreateOrUpdate = {

      idCodigoDeSeguimiento:this.miForm.controls['idCodigoDeSeguimiento'].value,
      idDetalleDeVenta:this.miForm.controls['idDetalleDeVenta'].value, 
      idDireccion:this.miForm.controls['idDireccion'].value,
      correo:this.miForm.controls['correo'].value,
      sucursal:this.miForm.controls['sucursal'].value,
   }

   this.shippingSaleService.edit(newprod);

   this.router.navigate(['EnvioVenta/buscar'])

   this._snackBar.open('El envio de la venta fue editado con exito', '',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition:'bottom'
    })
  }

  goBack():void{
    this.location.back()
  }
}
