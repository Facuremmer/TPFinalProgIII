import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { ClickDirectiveDirective } from '../directives/clickDirective.directive';
import { SidebarComponent } from './sidebar/sidebar.component';





@NgModule({
  declarations: [
    SidebarComponent,
    ClickDirectiveDirective

  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    SidebarComponent,
    ClickDirectiveDirective
  ]
})
export class SharedModule { }