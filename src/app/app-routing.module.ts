import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'Clientes',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
  },
  
  {
    path: 'Compra',
    loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule),
  },

  {
    path: 'DetalleCompra',
    loadChildren: () => import('./purchaseDetail/purchaseDetail.module').then(m => m.PurchaseDetailModule),
  },
  {
    path: 'DetalleVenta',
    loadChildren: () => import('./saleDetail/saleDetail.module').then(m => m.SaleDetailModule),
  },
  {
    path: 'Dirección',
    loadChildren: () => import('./adress/adress.module').then(m => m.AdressModule),
  },
  {
    path: 'EnvioCompra',
    loadChildren: () => import('./shippingPurchase/shippingPurchase.module').then(m => m.ShippingPurchaseModule),
  },
  
  {
    path: 'EnvioVenta',
    loadChildren: () => import('./shippingSale/shippingSale.module').then(m => m.ShippingSaleModule),
  },
  {
    path: 'Homepage',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule),
  },
  {
    path: 'Login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },

  {
    path: 'productos',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
  },

  {
    path: 'persona',
    loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
  },

  {
    path: 'Proveedor',
    loadChildren: () => import('./provider/provider.module').then(m => m.ProviderModule),
  },
  {
    path: 'Ventas',
    loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule),
  },

  {
    path: 'Lector',
    loadChildren: () => import('./qr-reader/qr-reader.module').then(m => m.QRModule),
  },
 
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