import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdProduct } from 'src/app/product/interfaces/idProduct.interface';
import { SaleId } from 'src/app/sale/interfaces/saleId.interface';
import { SaleDetail } from '../interfaces/saleDetail.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/product/services/product.service';
import { SaleService } from 'src/app/sale/services/sale.service';
import { SaleDetailService } from '../services/saleDetail.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { SaleDetailUpdate } from '../interfaces/saleDetailUpdate';

@Component({
  selector: 'app-view-sale-detail',
  templateUrl: './view-sale-detail.component.html',
})
export class ViewSaleDetailComponent {
  miForm!: FormGroup;

  
  initForm(): FormGroup {
    return this.formBuilder.group({
      idDetalleVenta:[,Validators.required],
      idVenta: [Validators.required],
      idProducto:[,Validators.required],
      precio: [,[Validators.required, Validators.min(0)]],
      cantidad: [,[Validators.required, Validators.min(0)]],
      descuento: [,[Validators.required, Validators.min(0)]],
      recargo: [,[Validators.required, Validators.min(0)]]
    })
  }

  
  sales: SaleId[] = [];

  Products: IdProduct [] = [];

  saleDetail: SaleDetail = {};

  constructor (private formBuilder: FormBuilder,
               private activateRoutes: ActivatedRoute,
               private productSevice: ProductService,
               private saleService: SaleService,
               private saleDetailService: SaleDetailService,
               private router: Router,
               private _snackBar: MatSnackBar,
               private location: Location){}

   ngOnInit(): void {
    this.activateRoutes.params
      .pipe(
        switchMap(
          ({idDetalleVenta}) => this.saleDetailService.searchSaleDetailById(idDetalleVenta))
        )
        .subscribe(resp => {
          this.saleDetail = resp;
          this.OnPathValuePurchase(); 
        })

        this.saleService.SearchAllId()
        .subscribe(
          resp => {
              this.sales = resp;
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
      idDetalleVenta:this.saleDetail.idDetalleVenta,
      idVenta:this.saleDetail.idVenta,
      idProducto:this.saleDetail.idProducto,
      precio:this.saleDetail.precio,
      cantidad:this.saleDetail.cantidad,
      descuento:this.saleDetail.descuento,
      recargo:this.saleDetail.recargo,
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
  

   const newprod: SaleDetailUpdate = {

      idDetalleVenta:this.miForm.controls['idDetalleVenta'].value,
      idVenta:this.miForm.controls['idVenta'].value, 
      idProducto:this.miForm.controls['idProducto'].value,
      precio:this.miForm.controls['precio'].value,
      cantidad:this.miForm.controls['cantidad'].value,
      descuento:this.miForm.controls['descuento'].value,
      recargo:this.miForm.controls['recargo'].value,

   }

   this.saleDetailService.edit(newprod);

   this.router.navigate(['DetalleVenta/buscar'])

   this._snackBar.open('El detalle de la venta fue editado con exito', '',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition:'bottom'
    })
  }

  goBack():void{
    this.location.back()
  }
}
