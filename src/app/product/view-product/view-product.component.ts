import { Component, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { switchMap} from 'rxjs/operators';
import { TypeProduct } from '../interfaces/typeProduct.interface';
import { ProductCreate } from '../interfaces/productCreate.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',

})
export class ViewProductComponent implements OnInit{

  miForm = this.formBuilder.group (
    {
      idProducto:[],
      idTipoProducto: [,[Validators.required,Validators.min(0)]],
      stockActual: [,[Validators.required,Validators.min(0)]]
    }
  )
  typeProds: TypeProduct[] = [];

  product: Product = {};

  constructor (private formBuilder: FormBuilder,
               private activateRoutes: ActivatedRoute,
               private productSevice: ProductService,
               private router: Router,
               private _snackBar: MatSnackBar,
               private location: Location){}

   ngOnInit(): void {
    this.activateRoutes.params
      .pipe(
        switchMap(
          ({idprod}) => this.productSevice.SearchProductById(idprod))
        )
        .subscribe(resp => {
          this.product = resp;
        });

        this.productSevice.nameProducts()
        .subscribe(
          resp => {
              this.typeProds = resp;
          });
          
  }

  idProductoError(){
    return this.miForm.controls.idProducto.errors &&
           this.miForm.controls.idProducto.touched;
    ; 
    
  }
  
  idTipoProductoError(){
    return this.miForm.controls.idTipoProducto.errors &&
           this.miForm.controls.idTipoProducto.touched; 
    
  }

  stockActualError(){
    return this.miForm.controls.stockActual.errors &&
           this.miForm.controls.stockActual.touched; 
    
  }

  save(){
    if (this.miForm.invalid){
      this.miForm.markAllAsTouched();
      return;
    } 
  

   const newprod: ProductCreate = {

     idProducto: this.miForm.controls.idProducto.value!,
     idTipoProducto: this.miForm.controls.idTipoProducto.value!,
     stockActual: this.miForm.controls.stockActual.value!,
   }

   this.productSevice.edit(newprod);

   this.location.go('productos/buscar')
   this.router.navigate(['productos/buscar'])

   this._snackBar.open('El producto fue editado con exito', '',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition:'bottom'
    })
  }

  goBack():void{
    this.location.back()
  }
}