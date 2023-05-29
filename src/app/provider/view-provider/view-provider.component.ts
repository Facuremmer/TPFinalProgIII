import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

import { Person } from 'src/app/person/interfaces/person.interface';
import { PersonService } from 'src/app/person/services/person-service';
import { Provider } from '../interfaces/provider.interface';
import { ProviderCreate } from '../interfaces/providerCreate.interface';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.css']
})
export class ViewProviderComponent {
  miForm!: FormGroup;
  persons: Person[] = [];
  provider: Provider = {}; // Cambiado de providers a provider
  
  constructor(
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private providerService: ProviderService,
    private personService: PersonService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ idprov }) => this.providerService.SearchProviderById(idprov))
      )
      .subscribe((resp) => {
        this.provider = resp;
        this.OnPatchValueProvider();
      });
      

    this.personService.SearchAllDNI().subscribe((resp) => {
      this.persons = resp;
    });

    this.miForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      idProvider: [, Validators.required],
      dni: [, Validators.required],
      rubro: [, Validators.required],
    });
  }

  OnPatchValueProvider(): void {
    this.miForm.patchValue({
      idProvider: this.provider.idProvider,
      dni: this.provider.dni,
      rubro: this.provider.rubro,
    });
  }

  hasError(field: string) {
    return this.miForm.controls[field].errors && this.miForm.controls[field].touched;
  }

  save() {
    if (this.miForm.invalid) {
      this.miForm.markAllAsTouched();
      return;
    }

    const newprod: ProviderCreate = {
      dni: this.miForm.controls['dni'].value,
      rubro: this.miForm.controls['rubro'].value,
    };

    this.providerService.edit(newprod);

    this.router.navigate(['proveedor/buscar']);

    this._snackBar.open('El proveedor fue editado con éxito', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  goBack(): void {
    this.location.back();
  }
}

