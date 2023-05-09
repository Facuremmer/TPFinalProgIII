import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { MainProductComponent } from './main-product/main-product.component';
import { SearchProductComponent } from './search-product/search-product.component';



const routes: Routes = [
  {
    path: 'buscar',
    component: MainProductComponent,
  },
  {
    path: 'agregar',
    component: CreateProductComponent,
  },
  {
    path: 'edit-prod/:idprod',
    component: ViewProductComponent
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
export class ProductRoute { }