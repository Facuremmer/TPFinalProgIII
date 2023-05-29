import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SaleDetailService } from '../services/saleDetail.service';

@Component({
  selector: 'app-result-sale-detail',
  templateUrl: './result-sale-detail.component.html', 
})
export class ResultSaleDetailComponent {

  ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.saleDetailService.allSaleDetails;
    }

  constructor(private saleDetailService: SaleDetailService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['id','precio','cantidad', 'descuento', 'recargo', 'ver'];


  eliminateSaleDetail(id:number){
    this.saleDetailService.eliminate(id);

    this._snackBar.open('El detalle de venta fue eliminado con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();
     
  }
}