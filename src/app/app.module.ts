import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SearchProductComponent } from './views/search-product/search-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
