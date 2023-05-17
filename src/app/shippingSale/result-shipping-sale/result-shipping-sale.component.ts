import { Component } from '@angular/core';
import { ShippingSaleService } from '../services/shippingSale.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-result-shipping-sale',
  templateUrl: './result-shipping-sale.component.html',
})
export class ResultShippingSaleComponent {
  ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.shippingSaleService.allShippingSales;
    }

  constructor(private shippingSaleService: ShippingSaleService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['codigoSeguimiento','correo','sucursal', 'ver'];


  eliminateShippingSale(id:number){
    this.shippingSaleService.eliminate(id);

    this._snackBar.open('El envio de venta fue eliminado con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();
     
  }
}
