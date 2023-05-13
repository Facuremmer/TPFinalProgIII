import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { switchMap} from 'rxjs/operators';
import { TypeProduct } from '../interfaces/typeProduct.interface';
import { ProductCreate } from '../interfaces/productCreate.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ProductId } from '../interfaces/productId.interface';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',

})
export class ViewProductComponent implements OnInit{
  miForm!: FormGroup;

  
  initForm(): FormGroup {
    return this.formBuilder.group({
      idProducto:[[Validators.required, Validators.minLength(4),Validators.min(0)]],
      idTipoProducto: [,[Validators.required,Validators.min(0)]],
      stockActual: [,[Validators.required,Validators.min(0)]],
      precio: [,[Validators.required,Validators.min(0)]]
    })
  }

  
  typeProds: TypeProduct[] = [];

  product: ProductId = {};

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
          this.OnPathValueProduct(); 
        })

        this.productSevice.nameProducts()
        .subscribe(
          resp => {
              this.typeProds = resp;
          });

          this.miForm = this.initForm();   
  }

    OnPathValueProduct():void {
    this.miForm.patchValue({
      idProducto:this.product.idProducto,
      idTipoProducto:this.product.idTipoProducto, 
      stockActual: this.product.stockActual,
      precio: this.product.precio,
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
  

   const newprod: ProductCreate = {

     idProducto: this.miForm.controls['idProducto'].value,
     idTipoProducto: this.miForm.controls['idTipoProducto'].value,
     stockActual: this.miForm.controls['stockActual'].value,
     precio: this.miForm.controls['precio'].value,
   }

   this.productSevice.edit(newprod);

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