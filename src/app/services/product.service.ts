import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Util from '../helpers/util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  filter(order: string, direction: string, type: string, page: number, size: number, search: string) {
    let params = '';
    params = Util.createParams('order', order, params);
    params = Util.createParams('direction', direction, params);
    params = Util.createParams('type', type, params);
    params = Util.createParams('page', page, params);
    params = Util.createParams('size', size, params);
    params = Util.createParams('search', search, params);
    return this.http.get(`${environment.apiURL}/product/page/filter${params}`);
  }

  getById(id: number) {
    return this.http.get(environment.apiURL + '/product/' + id);
  }
}
