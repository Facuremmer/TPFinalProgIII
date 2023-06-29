import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainSaleDetailComponent } from './main-sale-detail/main-sale-detail.component';
import { ViewSaleDetailComponent } from './view-sale-detail/view-sale-detail.component';





const routes: Routes = [
  {
    path: 'buscar',
    component: MainSaleDetailComponent,
  },
  {
    path: 'edit-SaleDetail/:idDetalleVenta',
    component: ViewSaleDetailComponent
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
export class SaleDetailRoute { }