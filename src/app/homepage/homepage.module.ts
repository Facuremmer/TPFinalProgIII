import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { HomepageComponent } from './homepage/homepage.component';
import { HomepageRoute } from './homepage.routes';




@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule, 
    HomepageRoute,
    SharedModule,
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomepageModule { }