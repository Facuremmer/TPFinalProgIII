import { Component } from '@angular/core';
import { PurchaseId } from 'src/app/purchase/interfaces/purchaseId.interface';
import { PurchaseDetail } from '../interfaces/purchaseDetail.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from 'src/app/purchase/services/purchase.service';
import { ProductService } from 'src/app/product/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { PurchaseDetailService } from '../services/purchaseDetail.service';
import { PurchaseDetailUpdate } from '../interfaces/purchaseDetailUpdate.Interface';
import { IdProduct } from 'src/app/product/interfaces/idProduct.interface';

@Component({
  selector: 'app-view-purchase-detail',
  templateUrl: './view-purchase-detail.component.html',
})
export class ViewPurchaseDetailComponent {
  miForm!: FormGroup;

  
  initForm(): FormGroup {
    return this.formBuilder.group({
      idDetalleCompra:[,Validators.required],
      idCompra: [Validators.required],
      idProducto:[,Validators.required],
      precio: [,[Validators.required, Validators.min(0)]],
      cantidad: [,[Validators.required, Validators.min(0)]],
      retencion: [,[Validators.required, Validators.min(0)]]
    })
  }

  
  purchases: PurchaseId[] = [];

  Products: IdProduct [] = [];

  purchaseDetail: PurchaseDetail = {};

  constructor (private formBuilder: FormBuilder,
               private activateRoutes: ActivatedRoute,
               private productSevice: ProductService,
               private purchaseService: PurchaseService,
               private purchaseDetailService: PurchaseDetailService,
               private router: Router,
               private _snackBar: MatSnackBar,
               private location: Location){}

   ngOnInit(): void {
    this.activateRoutes.params
      .pipe(
        switchMap(
          ({idDetalleCompra}) => this.purchaseDetailService.searchPurchaseDetailById(idDetalleCompra))
        )
        .subscribe(resp => {
          this.purchaseDetail = resp;
          this.OnPathValuePurchase(); 
        })

        this.purchaseService.SearchAllId()
        .subscribe(
          resp => {
              this.purchases = resp;
          });

          this.productSevice.SearchAllProductsId()
        .subscribe(
          resp => {
              this.Products = resp;
          });
          
          this.miForm = this.initForm();   
  }

    OnPathValuePurchase():void {
    this.miForm.patchValue({
      idDetalleCompra:this.purchaseDetail.idDetalleCompra,
      idCompra:this.purchaseDetail.idCompra,
      idProducto:this.purchaseDetail.idProducto,
      precio:this.purchaseDetail.precio,
      cantidad:this.purchaseDetail.cantidad,
      retencion:this.purchaseDetail.retencion,
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
  

   const newprod: PurchaseDetailUpdate = {

      idDetalleCompra:this.miForm.controls['idDetalleCompra'].value,
      idCompra:this.miForm.controls['idCompra'].value, 
      idProducto:this.miForm.controls['idProducto'].value,
      precio:this.miForm.controls['precio'].value,
      cantidad:this.miForm.controls['cantidad'].value,
      retencion:this.miForm.controls['retencion'].value,

   }

   this.purchaseDetailService.edit(newprod);

   this.router.navigate(['DetalleCompra/buscar'])

   this._snackBar.open('El detalle de la compra fue editado con exito', '',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition:'bottom'
    })
  }

  goBack():void{
    this.location.back()
  }
}
