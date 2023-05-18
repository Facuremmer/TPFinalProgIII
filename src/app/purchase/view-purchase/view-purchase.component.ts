import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Purchase } from '../interfaces/purchase.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/provider/services/provider.service';
import { PurchaseService } from '../services/purchase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { ProviderId } from 'src/app/provider/interfaces/providerId.interface';
import { PurchaseUpdate } from '../interfaces/purchaseUpdate.interface';

@Component({
  selector: 'app-view-purchase',
  templateUrl: './view-purchase.component.html',
})
export class ViewPurchaseComponent {
  miForm!: FormGroup;

  
  initForm(): FormGroup {
    return this.formBuilder.group({
      idCompra:[,Validators.required],
      idProveedor: [Validators.required],
      totalCompra: [,Validators.required],
      fecha: [,Validators.required],
    })
  }

  
  providers: ProviderId[] = [];

  purchase: Purchase = {};

  constructor (private formBuilder: FormBuilder,
               private activateRoutes: ActivatedRoute,
               private providerSevice: ProviderService,
               private purchaseService: PurchaseService,
               private router: Router,
               private _snackBar: MatSnackBar,
               private location: Location){}

   ngOnInit(): void {
    this.providerSevice.SearchAllId()
        .subscribe(
          resp => {
              this.providers = resp;
          });

    this.activateRoutes.params
      .pipe(
        switchMap(
          ({idCompra}) => this.purchaseService.searchPurchaseById(idCompra))
        )
        .subscribe(resp => {
          this.purchase = resp;
          this.OnPathValuePurchase(); 
        })
          this.miForm = this.initForm();   
  }

    OnPathValuePurchase():void {
    this.miForm.patchValue({
      idCompra:this.purchase.idCompra,
      idProveedor:this.purchase.idProveedor, 
      totalCompra:this.purchase.totalCompra, 
      fecha:this.purchase.fecha,
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
  

   const newprod: PurchaseUpdate = {

      idCompra:this.miForm.controls['idCompra'].value,
      idProveedor:this.miForm.controls['idProveedor'].value, 
      totalCompra:this.miForm.controls['totalCompra'].value,
      fecha:this.miForm.controls['fecha'].value,
   }

   this.purchaseService.edit(newprod);

   this.router.navigate(['Compra/buscar'])

   this._snackBar.open('La compra fue editada con exito', '',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition:'bottom'
    })
  }

  goBack():void{
    this.location.back()
  }
}
