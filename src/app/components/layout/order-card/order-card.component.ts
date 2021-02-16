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

  constructor(private orderService: OrderService,
    private orderApiService: OrderApiService,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.orderService.currentOrder.subscribe((order) => {
      this.order = order;
    });
  }

  ngOnInit(): void {
  }

  public remover(stockProduct: any) {
    this.orderService.remover(stockProduct.id);
  }




  public finalityOrder() {
    if (!this.authenticationService.isLogged)
      return this.router.navigate(['/login']);
    if (this.order)
      this.orderApiService.post(this.order).subscribe((data) => {
        console.log('data')
        this.orderService.clear();
      }, (error) => console.log(error));
  }

}
