import { Component } from '@angular/core';
import { ShippingPurchaseService } from '../services/shippingPurchase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-result-shipping-purchase',
  templateUrl: './result-shipping-purchase.component.html',
})
export class ResultShippingPurchaseComponent {
  ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.shippingPurchaseService.allShippingPurchases;
    }

  constructor(private shippingPurchaseService: ShippingPurchaseService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['codigoSeguimiento','correo','sucursal', 'ver'];


  eliminateShippingPurchase(id:number){
    this.shippingPurchaseService.eliminate(id);

    this._snackBar.open('El envio de compra fue eliminado con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();
     
  }
}
