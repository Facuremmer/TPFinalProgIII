import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QrReaderComponent } from './qr-reader.component';






const routes: Routes = [
  {
    path: 'QR',
    component: QrReaderComponent,
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
export class QRRoute { }