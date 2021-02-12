import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SearchProductComponent } from './views/search-product/search-product.component';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './views/product/product.component';
import { SpinnerComponent } from './components/layout/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { PrintsComponent } from './views/prints/prints.component';
import { OrderCardComponent } from './components/layout/order-card/order-card.component';


registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchProductComponent,
    ProductComponent,
    SpinnerComponent,
    PrintsComponent,
    OrderCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'pt-BR' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
