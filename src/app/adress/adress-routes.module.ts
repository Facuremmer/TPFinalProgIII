import { CreateAdressComponent } from './create-adress/create-adress.component';
import { MainAdressComponent } from './main-adress/main-adress.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAdressComponent } from './view-adress/view-adress.component';




const routes: Routes = [
  {
    path: 'buscar',
    component: MainAdressComponent,
  },
  {
    path: 'agregar',
    component: CreateAdressComponent,
  },
  {
    path: 'edit-adress/:idAdr',
    component: ViewAdressComponent
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
export class AdressRoute { }