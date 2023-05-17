import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-result-customer',
  templateUrl: './result-customer.component.html',
})
export class ResultCustomerComponent {


  ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.customerService.allCustomers;
    }

  constructor(private customerService: CustomerService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['id','dni', 'nombre', 'ver'];


  eliminateProduct(id:number){
    this.customerService.eliminate(id);

    this._snackBar.open('El Cliente fue eliminado con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();
     
  }
}