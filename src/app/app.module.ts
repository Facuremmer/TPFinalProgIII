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
import { CustomerModule } from './customer/customer.module';
import { PurchaseDetailModule } from './purchaseDetail/purchaseDetail.module';
import { SaleDetailModule } from './saleDetail/saleDetail.module';
import { SaleModule } from './sale/sale.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ShippingPurchaseModule } from './shippingPurchase/shippingPurchase.module';
import { ShippingSaleModule } from './shippingSale/shippingSale.module';


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
    ProviderModule,
    CustomerModule,
    PurchaseDetailModule,
    SaleDetailModule,
    SaleModule,
    PurchaseModule,
    ShippingPurchaseModule,
    ShippingSaleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
