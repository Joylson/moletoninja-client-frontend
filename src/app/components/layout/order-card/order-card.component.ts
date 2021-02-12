import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  public order: any;

  constructor(private orderService: OrderService) {
    this.orderService.currentOrder.subscribe((order) => {
      this.order = order;
    });
  }

  ngOnInit(): void {
  }

  public remover(stockProduct: any) {
    this.orderService.remover(stockProduct.id);
  }

}
