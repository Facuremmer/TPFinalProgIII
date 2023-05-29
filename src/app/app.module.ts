import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AdressModule } from './adress/adress.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerModule } from './customer/customer.module';
import { HomepageModule } from './homepage/homepage.module';
import { LoginModule } from './login/login.module';
import { PersonModule } from './person/person.module';
import { ProductModule } from './product/product.module';
import { ProviderModule } from './provider/provider.module';
import { PurchaseDetailModule } from './purchaseDetail/purchaseDetail.module';
import { PurchaseModule } from './purchase/purchase.module';
import { QRModule } from './qr-reader/qr-reader.module';
import { SaleDetailModule } from './saleDetail/saleDetail.module';
import { SaleModule } from './sale/sale.module';
import { SharedModule } from './shared/shared.module';
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
    ShippingSaleModule,
    LoginModule,
    HomepageModule,
    QRModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
