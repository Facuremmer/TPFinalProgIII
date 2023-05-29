import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateShippingPurchaseComponent } from './create-shipping-purchase/create-shipping-purchase.component';
import { MainShippingPurchaseComponent } from './main-shipping-purchase/main-shipping-purchase.component';
import { ViewShippingPurchaseComponent } from './view-shipping-purchase/view-shipping-purchase.component';





const routes: Routes = [
  {
    path: 'buscar',
    component: MainShippingPurchaseComponent,
  },
  {
    path: 'agregar',
    component: CreateShippingPurchaseComponent,
  },
  {
    path: 'edit-ShippingPurchase/:idShippingPurchase',
    component: ViewShippingPurchaseComponent
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
export class ShippingPurchaseRoute { }