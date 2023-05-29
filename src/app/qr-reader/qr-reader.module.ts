import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { QrReaderComponent } from './qr-reader.component';
import { QRRoute } from './qr-reader.routes.module';



@NgModule({
  declarations: [
    QrReaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    QRRoute,
    NgQrScannerModule
  ],
  exports: [
    QrReaderComponent
  ]
})
export class QRModule { }