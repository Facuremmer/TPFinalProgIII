import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPersonComponent } from './main-person/main-person.component';
import { CreatePersonComponent } from './create-person/create-person.component';
import { ViewPersonComponent } from './view-person/view-person.component';



const routes: Routes = [
  {
    path: 'buscar',
    component: MainPersonComponent
  },
  {
    path: 'agregar',
    component: CreatePersonComponent,
  },
  {
    path: 'edit-pers/:idpers',
    component: ViewPersonComponent
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PersonRoute { } 