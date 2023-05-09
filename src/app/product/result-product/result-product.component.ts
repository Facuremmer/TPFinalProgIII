import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-result-productos',
  templateUrl: './result-product.component.html',
  styles: [
  ]
})
export class ResultProductComponent {


   ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.prodsService.allProducts;
    }

  constructor(private prodsService: ProductService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['codigo', 'nombre','stock', 'ver'];

  eliminateProduct(id:number){
    console.log(id);
    this.prodsService.eliminate(id);

    this._snackBar.open('El producto fue eliminado con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();

     this.prodsService.SearchAllProducts();
     this.resultSearch
     
  }
}