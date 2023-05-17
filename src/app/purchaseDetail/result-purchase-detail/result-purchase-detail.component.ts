import { Component } from '@angular/core';
import { PurchaseDetailService } from '../services/purchaseDetail.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-result-purchase-detail',
  templateUrl: './result-purchase-detail.component.html',
})
export class ResultPurchaseDetailComponent {

  ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.purchaseDetailService.allPurchaseDetails;
    }

  constructor(private purchaseDetailService: PurchaseDetailService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['id','precio','cantidad', 'retencion', 'ver'];


  eliminatePurchaseDetail(id:number){
    this.purchaseDetailService.eliminate(id);

    this._snackBar.open('El detalle de compra fue eliminado con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();
     
  }
}
