import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockProductService } from './stock-product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private currentOrderSubject: BehaviorSubject<any>;
  public currentOrder: Observable<any>;

  constructor(private stockProductService: StockProductService) {
    this.currentOrderSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentOrder')));
    this.currentOrder = this.currentOrderSubject.asObservable();
  }

  public addStockProductColorAndSize(colorId: any, sizeId: any, productId: any, print: any) {
    let order = JSON.parse(localStorage.getItem('currentOrder'));
    this.stockProductService.getByColorAndSizeAndProduct(colorId, sizeId, productId).subscribe((data: any) => {
      if (print)
        data.print = print;
      if (!order)
        order = this.newOrder;
      if (!order.stockProducts)
        order.stockProducts = [];
      if (this.validStock(order.stockProducts, data)) {
        order.stockProducts.push(data);
        localStorage.setItem('currentOrder', JSON.stringify(order));
        this.currentOrderSubject.next(order);
      }
    });
  }

  private validStock(stockProducts: [any], stockProduct: any) {
    let valid = true;
    stockProducts.forEach(async (sp) => {
      if (sp.id === stockProduct.id)
        valid = false;
    });
    return valid;
  }

  public deleteOrder() {
    localStorage.removeItem('currentOrder');
    this.currentOrderSubject.next(null);
  }

  public remover(id: any) {
    let order = JSON.parse(localStorage.getItem('currentOrder'));
    if (order) {
      order.stockProducts = order.stockProducts.filter((sp) => sp.id !== id);
      if (order.stockProducts.length === 0) {
        order = null;
      }
      localStorage.setItem('currentOrder', JSON.stringify(order));
      this.currentOrderSubject.next(order);
    }
  }

  public clear() {
    localStorage.setItem('currentOrder', JSON.stringify(null));
    this.currentOrderSubject.next(null);
  }

  private newOrder = {
    'visualized': false,
    'payed': false
  };

}
