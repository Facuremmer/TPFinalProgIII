import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { MainProductComponent } from './product/main-product/main-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';



const routes: Routes = [
  {
    path: '',
    component: MainProductComponent,
    pathMatch: 'full'
  },
  {
    path: 'create-prod',
    component: CreateProductComponent
  },
  {
    path: 'edit-prod/:idprod',
    component: ViewProductComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
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