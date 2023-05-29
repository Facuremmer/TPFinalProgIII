import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateSaleComponent } from './create-sale/create-sale.component';
import { MainSaleComponent } from './main-sale/main-sale.component';
import { ViewSaleComponent } from './view-sale/view-sale.component';





const routes: Routes = [
  {
    path: 'buscar',
    component: MainSaleComponent,
  },
  {
    path: 'agregar',
    component: CreateSaleComponent,
  },
  {
    path: 'edit-Sale/:saleId',
    component: ViewSaleComponent
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
export class SaleRoute { }