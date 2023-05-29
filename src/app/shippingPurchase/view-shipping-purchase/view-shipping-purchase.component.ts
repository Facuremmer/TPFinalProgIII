import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

import { PurchaseDetailId } from 'src/app/purchaseDetail/interfaces/purchaseDetailId.interface';
import { PurchaseDetailService } from 'src/app/purchaseDetail/services/purchaseDetail.service';
import { ShippingPurchase } from '../interfaces/shippingPurchase.interface';
import { ShippingPurchaseCreateOrUpdate } from '../interfaces/shippingPurchaseCreateOrUpdate.interface';
import { ShippingPurchaseService } from '../services/shippingPurchase.service';

@Component({
  selector: 'app-view-shipping-purchase',
  templateUrl: './view-shipping-purchase.component.html',
  styleUrls: ['./view-shipping-purchase.component.css']
})
export class ViewShippingPurchaseComponent {
  miForm!: FormGroup;

  
  initForm(): FormGroup {
    return this.formBuilder.group({
      idCodigoDeSeguimiento:[,Validators.required],
      idDetalleCompra: [Validators.required],
      correo:[,Validators.required],
      sucursal: [,[Validators.required, Validators.min(0)]],
    })
  }

  
  purchaseDetails: PurchaseDetailId[] = [];

  shippingPurchase: ShippingPurchase = {};

  constructor (private formBuilder: FormBuilder,
               private activateRoutes: ActivatedRoute,
               private purchaseDetailService: PurchaseDetailService,
               private shippingPurchaseService: ShippingPurchaseService,
               private router: Router,
               private _snackBar: MatSnackBar,
               private location: Location){}

   ngOnInit(): void {
    this.activateRoutes.params
      .pipe(
        switchMap(
          ({idShippingPurchase}) => this.shippingPurchaseService.searchShippingPurchaseById(idShippingPurchase))
        )
        .subscribe(resp => {
          this.shippingPurchase = resp;
          this.OnPathValuePurchase(); 
        })

        this.purchaseDetailService.SearchAllId()
        .subscribe(
          resp => {
              this.purchaseDetails = resp;
          });
          
          this.miForm = this.initForm();   
  }

    OnPathValuePurchase():void {
    this.miForm.patchValue({
      idCodigoDeSeguimiento:this.shippingPurchase.idCodigoDeSeguimiento,
      idDetalleCompra:this.shippingPurchase.idDetalleCompra,
      correo:this.shippingPurchase.correo,
      sucursal:this.shippingPurchase.sucursal,
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
  

   const newprod: ShippingPurchaseCreateOrUpdate = {

      idCodigoDeSeguimiento:this.miForm.controls['idCodigoDeSeguimiento'].value,
      idDetalleCompra:this.miForm.controls['idDetalleCompra'].value, 
      correo:this.miForm.controls['correo'].value,
      sucursal:this.miForm.controls['sucursal'].value,
   }

   this.shippingPurchaseService.edit(newprod);

   this.router.navigate(['EnvioCompra/buscar'])

   this._snackBar.open('El envio de la compra fue editado con exito', '',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition:'bottom'
    })
  }

  goBack():void{
    this.location.back()
  }
}
