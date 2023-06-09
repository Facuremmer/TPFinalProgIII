import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPurchaseDetailComponent } from './main-purchase-detail/main-purchase-detail.component';
import { ViewPurchaseDetailComponent } from './view-purchase-detail/view-purchase-detail.component';





const routes: Routes = [
  {
    path: 'buscar',
    component: MainPurchaseDetailComponent,
  },
  {
    path: 'edit-PurchaseDetail/:idDetalleCompra',
    component: ViewPurchaseDetailComponent
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
export class PurchaseDetailRoute { }