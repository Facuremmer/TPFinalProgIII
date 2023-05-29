import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePurchaseComponent } from './create-purchase/create-purchase.component';
import { MainPurchaseComponent } from './main-purchase/main-purchase.component';
import { ViewPurchaseComponent } from './view-purchase/view-purchase.component';





const routes: Routes = [
  {
    path: 'buscar',
    component: MainPurchaseComponent,
  },
  {
    path: 'agregar',
    component: CreatePurchaseComponent,
  },
  {
    path: 'edit-Purchase/:idCompra',
    component: ViewPurchaseComponent
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
export class PurchaseRoute { }