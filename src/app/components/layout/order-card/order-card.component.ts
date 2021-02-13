import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private orderService: OrderService, private orderApiService: OrderApiService) {
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
    if (this.order)
      this.orderApiService.post(this.order).subscribe((data) => {
        console.log('data')
        this.orderService.clear();
      }, (error) => console.log(error));
  }

}
