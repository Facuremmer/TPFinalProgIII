import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-result-provider',
  templateUrl: './result-provider.component.html',
})
export class ResultProviderComponent {

  ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.providerService.allProvider;
    }

    

  constructor(private providerService: ProviderService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['idProvider','nombre','dni', 'rubro', 'ver'];


  eliminateProvider(id:number){
    this.providerService.eliminate(id);

    this._snackBar.open('El proveedor fue eliminado con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();
     
  }
}
