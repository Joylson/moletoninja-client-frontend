import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  filter() {
    let params = '';
    return this.http.get(`${environment.apiURL}/product/page/filter${params}`);
  }
}
