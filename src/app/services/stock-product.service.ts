import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockProductService {

  constructor(private http: HttpClient) { }

  getByColorAndSizeAndProduct(colorId: any, sizeId: any, productId: any) {
    return this.http.get(environment.apiURL + `/stock-product/product/${productId}/color/${colorId}/size/${sizeId}`);
  }
}
