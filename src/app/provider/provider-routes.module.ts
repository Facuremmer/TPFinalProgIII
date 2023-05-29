import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateProviderComponent } from './create-provider/create-provider.component';
import { MainProviderComponent } from './main-provider/main-provider.component';
import { ViewProviderComponent } from './view-provider/view-provider.component';


const routes: Routes = [
  {
    path: 'buscar',
    component: MainProviderComponent,
  },
  {
    path: 'agregar',
    component: CreateProviderComponent,
  },
  {
    path: 'edit-provider/:idprov',
    component: ViewProviderComponent
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
export class ProviderRoute { }