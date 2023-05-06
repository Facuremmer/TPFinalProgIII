import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductCreate } from '../interfaces/productCreate.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent implements OnInit{

  miForm = this.formBuilder.group (
    {
      idProducto:[,[Validators.required, Validators.minLength(4)]],
      idTipoProducto: [,[Validators.required,Validators.min(0)]],
      stockActual: [,[Validators.required,Validators.min(0)]]
    }
  )
  constructor(private formBuilder: FormBuilder,
              private productService: ProductService){ }

  ngOnInit(): void { 
    //Con esto puedo pre cargarle un valor a uno de los campos, se puede poner igual en una función.
    /* const ran = 5;
    this.miForm.reset(
      {
        stockActual: 5
      }
    ); */
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

   console.log('guardando producto');

    const newprod: ProductCreate = {

      idProducto: this.miForm.controls.idProducto.value!,
      idTipoProducto: this.miForm.controls.idTipoProducto.value!,
      stockActual: this.miForm.controls.stockActual.value!,
    }

    this.productService.create(newprod);

    this.miForm.reset( ); 
  }
}