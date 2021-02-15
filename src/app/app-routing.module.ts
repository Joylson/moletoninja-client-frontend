import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchProductComponent } from './views/search-product/search-product.component';
import { OrdersComponent } from './views/orders/orders.component';
import { OrderFormComponent } from './views/order-form/order-form.component';
import { LoginComponent } from './views/login/login.component';

import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: SearchProductComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } //redireciona para a home caso a rota não exista
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
