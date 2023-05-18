import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultProviderComponent } from './result-provider/result-provider.component';
import { MaterialModule } from '../material/material.module';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { MainProviderComponent } from './main-provider/main-provider.component';
import { SearchProviderComponent } from './search-provider/search-provider.component';
import { ViewProviderComponent } from './view-provider/view-provider.component';
import { ProviderRoute } from './provider-routes.module';
import { ProviderService } from './services/provider.service';




@NgModule({
  declarations: [
    ResultProviderComponent, 
    SearchProviderComponent, 
    MainProviderComponent, 
    CreateProviderComponent, 
    ViewProviderComponent
],


  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ProviderRoute,
    MaterialModule
  ],
  exports: [
    MainProviderComponent,
    ResultProviderComponent, 
    SearchProviderComponent, 
  ],
  providers: [
    ProviderService
  ]
})
export class ProviderModule { }