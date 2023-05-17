import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonModule } from './person/person.module';
import { AdressModule } from './adress/adress.module';
import { ProviderModule } from './provider/provider.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ProductModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PersonModule,
    AdressModule,
    ProviderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
