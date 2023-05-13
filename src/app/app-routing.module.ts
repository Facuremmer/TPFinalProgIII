import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
  },
  
  {
    path: 'persona',
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
  },

  {
    path: 'Dirección',
    loadChildren: () => import('./adress/adress.module').then(m => m.AdressModule),
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