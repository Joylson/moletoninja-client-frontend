import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderApiService } from 'src/app/services/order-api.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  public order: any;

  @Input() show: boolean = false;

  public loading: boolean = false;
  public error: boolean = false;
  public success: boolean = false;
  public msg: string ;

  constructor(private orderService: OrderService,
    private orderApiService: OrderApiService,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.orderService.currentOrder.subscribe((order) => {
      this.order = order;
      if (this.order && this.order.stockProductsKit)
        this.order.stockProductsKit = this.order.stockProductsKit.map((spk) => {
          spk.isCollapsed = false;
          return spk;
        });
    });
  }

  ngOnInit(): void {
  }

  public remover(stockProduct: any) {
    this.orderService.remover(stockProduct.id);
  }

  public removerKit(product: any) {
    this.orderService.removerKit(product.id);
  }

  public changeQtd() {
    if (this.order)
      this.orderService.setOrder(this.order);
  }

  public finalityOrder() {
    if (!this.authenticationService.isLogged)
      return this.router.navigate(['/login']);
    if (this.order) {
      this.loading = true;
      this.orderApiService.post(this.order).subscribe(async (data) => {
        this.orderService.clear();
        this.loading = false;
        this.success = true;
        this.msg = "Seu pedido foi realizado com sucesso, você será redirecionado para o seu pedido";
        await this.delay(3000)
        this.router.navigate([`orders/${data['result']['id']}`]);
      }, async (error) => {
        this.loading = false;
        this.error = true;
        this.msg = 'Houve um erro durante o processamento do seu pedido, favor tentar novamente mais tarde';
        await this.delay(2000)
        this.error = false;
      });
    }
  }

  public arrayNumber(ranger: number): Array<number> {
    return Array(ranger).fill(null).map((x, i) => i + 1);
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}
