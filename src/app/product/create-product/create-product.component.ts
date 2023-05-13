import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductCreate } from '../interfaces/productCreate.interface';
import { ProductService } from '../services/product.service';
import { TypeProduct } from '../interfaces/typeProduct.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent implements OnInit{

  miForm = this.formBuilder.group (
    {
      idProducto:[,[Validators.required, Validators.min(0)]],
      idTipoProducto: [,[Validators.required,Validators.min(0)]],
      stockActual: [,[Validators.required,Validators.min(0)]],
      precio: [,[Validators.required,Validators.min(0)]]
    }
  )

  typeProds: TypeProduct[] = [];

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private _snackBar: MatSnackBar,
              private location: Location,
              private  router: Router){ }

  ngOnInit(): void { 
    this.productService.nameProducts()
    .subscribe(
      resp => {
          this.typeProds = resp;
          console.log(this.typeProds)
      });
  }

  idTipoProductoError(){
    return this.miForm.controls.idTipoProducto.errors &&
           this.miForm.controls.idTipoProducto.touched; 
    
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
      precio:this.miForm.controls.precio.value!
    }

    this.productService.create(newprod);

    this.miForm.reset( ); 

    this._snackBar.open('El producto fue agregado con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
  }

  goCreateType(): void{
    this.router.navigate(['productos/agregarTipo'])
  }

  goBack():void{
    this.location.back()
  }
}