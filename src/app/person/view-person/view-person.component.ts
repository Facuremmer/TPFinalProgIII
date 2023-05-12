import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Person } from '../interfaces/person.interface';
import { PersonService } from '../services/person-service';

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
})
export class ViewPersonComponent implements OnInit{
  miForm1!: FormGroup;

  
  initForm(): FormGroup {
    return this.formBuilder.group({
      idCuit_Dni:['',[Validators.required,Validators.min(3000000), Validators.max(99999999)]],
      nombreCompleto: ['',Validators.required],
    })
  }

  
  //typeProds: TypeProduct[] = [];

  person: Person = {};

  constructor (private formBuilder: FormBuilder,
               private activateRoutes: ActivatedRoute,
               private personSevice: PersonService,
               private router: Router,
               private _snackBar: MatSnackBar,
               private location: Location){}

   ngOnInit(): void {
    this.activateRoutes.params
      .pipe(
        switchMap(
          ({idpers}) => this.personSevice.SearchPersonByDNI(idpers))
        )
        .subscribe(resp => {
          this.person = resp;
          this.OnPathValuePerson(); 
        })

          this.miForm1 = this.initForm();   
  }

    OnPathValuePerson():void {
    this.miForm1.patchValue({
      idCuit_Dni:this.person.idCuit_Dni,
      nombreCompleto:this.person.nombreCompleto, 
    })
  } 
  
  save(){
    if (this.miForm1.invalid){
      this.miForm1.markAllAsTouched();
      return;
    } 
  

   const newperns: Person = {

     idCuit_Dni: this.miForm1.controls['idCuit_Dni'].value,
     nombreCompleto: this.miForm1.controls['nombreCompleto'].value,
   }

   this.personSevice.edit(newperns);

   this.router.navigate(['persona/buscar'])

   this._snackBar.open('La persona fue editada con exito', '',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition:'bottom'
    })
  }

  goBack():void{
    this.location.back()
  }
}
