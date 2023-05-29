import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PersonService } from '../services/person-service';


@Component({
  selector: 'app-result-person',
  templateUrl: './result-person.component.html',
})
export class ResultPersonComponent {


  ngOnDestroy(){
    location.reload();
  } 

    get resultSearch() {
      return this.persnService.allPersons;
    }

  constructor(private persnService:PersonService,
              private _snackBar: MatSnackBar,) { }


  displayedColumns: string[] = ['nombre','DNI', 'ver'];


  eliminatePerson(id:number){
    this.persnService.eliminate(id);

    this._snackBar.open('La persona fue eliminada con exito', '',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
     })
    
     location.reload();
     
  }
}
