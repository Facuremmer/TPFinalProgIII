import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainShippingSaleComponent } from './main-shipping-sale/main-shipping-sale.component';
import { CreateShippingSaleComponent } from './create-shipping-sale/create-shipping-sale.component';
import { ViewShippingSaleComponent } from './view-shipping-sale/view-shipping-sale.component';





const routes: Routes = [
  {
    path: 'buscar',
    component: MainShippingSaleComponent,
  },
  {
    path: 'agregar',
    component: CreateShippingSaleComponent,
  },
  {
    path: 'edit-ShippingSale/:idDetalleDeVenta',
    component: ViewShippingSaleComponent
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
export class ShippingSaleRoute { }