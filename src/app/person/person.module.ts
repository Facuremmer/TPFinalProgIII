import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultPersonComponent } from './result-person/result-person.component';
import { SearchPersonComponent } from './search-person/search-person.component';
import { MainPersonComponent } from './main-person/main-person.component';
import { CreatePersonComponent } from './create-person/create-person.component';
import { ViewPersonComponent } from './view-person/view-person.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { PersonService } from './services/person-service';
import { PersonRoute } from './person-routes.module';



@NgModule({
  declarations: [
    ResultPersonComponent,
    SearchPersonComponent,
    MainPersonComponent,
    CreatePersonComponent,
    ViewPersonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PersonRoute,
    MaterialModule
  ],
  exports: [
    MainPersonComponent,
    SearchPersonComponent,
    ResultPersonComponent
  ],
  providers: [
    PersonService
  ]
})
export class PersonModule { }
