import { Component } from '@angular/core';
import { SaleService } from '../services/sale.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-result-sale',
  templateUrl: './result-sale.component.html',
})
export class ResultSaleComponent {

  ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.saleService.allSales;
    }

  constructor(private saleService: SaleService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['id','sucursal','fecha', 'total', 'ver'];


  eliminateSale(id:number){
    this.saleService.eliminate(id);

    this._snackBar.open('La venta fue eliminada con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();
     
  }
}
