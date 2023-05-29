import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductService } from '../services/product.service';
import { TypeProductCreate } from '../interfaces/typeProductCreate.interface';

@Component({
  selector: 'app-create-type-product',
  templateUrl: './create-type-product.component.html',
  styleUrls: ['./create-type-product.component.css']
})
export class CreateTypeProductComponent {
  miForm = this.formBuilder.group (
    {
      descripcion:[,Validators.required],
    }
  )


  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private _snackBar: MatSnackBar,
              private location: Location){ }

  ngOnInit(): void { 
  }

  save(){
    if (this.miForm.invalid){
      this.miForm.markAllAsTouched();
      return;
    } 

    const newType: TypeProductCreate = {
      descripcion: this.miForm.controls.descripcion.value!,
    }

    this.productService.createTypeProd(newType);

    this.miForm.reset( ); 

    this._snackBar.open('El tipo producto fue agregado con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
  }

  goBack():void{
    this.location.back()
  }
}
