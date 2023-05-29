import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PurchaseService } from '../services/purchase.service';


@Component({
  selector: 'app-result-purchase',
  templateUrl: './result-purchase.component.html',
})
export class ResultPurchaseComponent {


  ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.purchaseService.allPurchases;
    }

  constructor(private purchaseService: PurchaseService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['id','nombre','rubro', 'total', 'fecha', 'ver'];


  eliminatePurchase(id:number){
    this.purchaseService.eliminate(id);

    this._snackBar.open('El compra fue eliminada con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();
     
  }
}