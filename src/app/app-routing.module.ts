import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchProductComponent } from './views/search-product/search-product.component';


const routes: Routes = [
  { path: '', component: SearchProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
