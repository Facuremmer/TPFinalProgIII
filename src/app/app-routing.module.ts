import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { MainProductComponent } from './product/main-product/main-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';



const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
  },
  
  {
    path: 'persona',
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
  },
 
  //Aca abajo poner todos las otras rutas igual que la de productos.
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }