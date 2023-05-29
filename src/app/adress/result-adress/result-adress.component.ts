import { AdressService } from '../services/adress.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-result-adress',
  templateUrl: './result-adress.component.html',
})
export class ResultAdressComponent {


  ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.adressService.allAdress;
    }

    

  constructor(private adressService: AdressService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['nombre','dni', 'provincia','ciudad','calle', 'numero', 'ver'];


  eliminateAdress(id:number){
    this.adressService.eliminate(id);

    this._snackBar.open('La dirección fue eliminada con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();
     
  }
}
