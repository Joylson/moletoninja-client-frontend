import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrintService {


  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(environment.apiURL + '/print');
  }

  getById(id: number) {
    return this.http.get(environment.apiURL + '/print/' + id);
  }

  post(print: any) {
    return this.http.post(environment.apiURL + '/print', print);
  }

  put(print: any) {
    return this.http.put(environment.apiURL + '/print', print);
  }

  delete(id: number) {
    return this.http.delete(environment.apiURL + '/print/' + id);
  }
}
