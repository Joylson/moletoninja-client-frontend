import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockProductService } from './stock-product.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Util from '../helpers/util';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private currentOrderSubject: BehaviorSubject<any>;
  public currentOrder: Observable<any>;

  constructor(
    private stockProductService: StockProductService,
    private http: HttpClient
  ) {
    this.currentOrderSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentOrder')));
    this.currentOrder = this.currentOrderSubject.asObservable();
  }

  getById(id: number) {
    return this.http.get(environment.apiURL + '/order/' + id);
  }

  addFile(file: any) {
    return this.http.post(environment.apiURL + '/order/addFile', file);
  }

  public getByClient(order: string, direction: string, page: number, size: number, date: Date) {
    let params = '';
    params = Util.createParams('order', order, params);
    params = Util.createParams('direction', direction, params);
    params = Util.createParams('page', page, params);
    params = Util.createParams('size', size, params);
    params = Util.createParams('date', date != null ? moment(date).format('YYYY-MM-DD') : null, params);
    console.log(environment.apiURL + '/order/client/list' + params)
    return this.http.get(environment.apiURL + '/order/client/list' + params);
  }

  public filter(order: string, direction: string, page: number, size: number, date: Date) {
    let params = '';
    params = Util.createParams('order', order, params);
    params = Util.createParams('direction', direction, params);
    params = Util.createParams('page', page, params);
    params = Util.createParams('size', size, params);
    params = Util.createParams('date', date != null ? moment(date).format('YYYY-MM-DD') : null, params);
    console.log(environment.apiURL + '/order/page/filter' + params)
    return this.http.get(environment.apiURL + '/order/page/filter' + params);
  }

  public async addStockProductColorAndSize(colorId: any, sizeId: any, productId: any, print: any) {
    let order = await JSON.parse(localStorage.getItem('currentOrder'));
    this.stockProductService.getByColorAndSizeAndProduct(colorId, sizeId, productId).subscribe((data: any) => {
      if (print)
        data.print = print;
      if (!order)
        order = this.newOrder();
      if (!order.stockProducts)
        order.stockProducts = [];
      if (this.validStock(order.stockProducts, data)) {
        data.quantitySel = 1;
        order.stockProducts.push(data);
        localStorage.setItem('currentOrder', JSON.stringify(order));
        this.currentOrderSubject.next(order);
      }
    });
  }

  public async addStockProductKit(product: any) {
    let order = await JSON.parse(localStorage.getItem('currentOrder'));
    if (!order)
      order = this.newOrder();
    if (!order.stockProductsKit)
      order.stockProductsKit = [];
    if (this.validStockKit(order.stockProductsKit, product)) {
      product.selStockProductsKit = product.selStockProductsKit.map((spk) => {
        spk.quantitySel = 1;
        return spk;
      });
      let qtd = 0;
      for (let spk of product.selStockProductsKit) {
        if (qtd === 0 || spk.quantity < qtd)
          qtd = spk.quantity;
      }
      product.quantity = qtd;
      product.quantitySel = 1;
      order.stockProductsKit.push(product);
      localStorage.setItem('currentOrder', JSON.stringify(order));
      this.currentOrderSubject.next(order);
    }
  }

  private validStock(stockProducts: [any], stockProduct: any) {
    let valid = true;
    stockProducts.forEach(async (sp) => {
      if (sp.id === stockProduct.id)
        valid = false;
    });
    return valid;
  }

  private validStockKit(stockProductsKit: [any], product: any) {
    let valid = true;
    stockProductsKit.forEach(async (sp) => {
      if (sp.id === product.id)
        valid = false;
    });
    return valid;
  }

  public deleteOrder() {
    localStorage.removeItem('currentOrder');
    this.currentOrderSubject.next(null);
  }

  public async remover(id: any) {
    let order = await JSON.parse(localStorage.getItem('currentOrder'));
    if (order) {
      order.stockProducts = order.stockProducts.filter((sp) => sp.id !== id);
      if (order.stockProducts.length === 0 && (!order.stockProductsKit || order.stockProductsKit.length === 0)) {
        order = null;
      }
      localStorage.setItem('currentOrder', JSON.stringify(order));
      this.currentOrderSubject.next(order);
    }
  }

  public async removerKit(id: any) {
    let order = await JSON.parse(localStorage.getItem('currentOrder'));
    if (order) {
      order.stockProductsKit = order.stockProductsKit.filter((sp) => sp.id !== id);
      if (order.stockProductsKit.length === 0 && (!order.stockProducts || order.stockProducts.length === 0)) {
        order = null;
      }
      localStorage.setItem('currentOrder', JSON.stringify(order));
      this.currentOrderSubject.next(order);
    }
  }

  public setOrder(order: any) {
    localStorage.setItem('currentOrder', JSON.stringify(order));
    this.currentOrderSubject.next(order);
  }

  public clear() {
    localStorage.removeItem('currentOrder');
    this.currentOrderSubject.next(null);
  }

  private newOrder = () => {
    return {
      'visualized': false,
      'payed': false
    };
  }

}
