import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(environment.apiURL + '/category');
  }

  getById(id: number) {
    return this.http.get(environment.apiURL + '/category/' + id);
  }

  post(category: any) {
    return this.http.post(environment.apiURL + '/category', category);
  }

  put(category: any) {
    return this.http.put(environment.apiURL + '/category', category);
  }

  delete(id: number) {
    return this.http.delete(environment.apiURL + '/category/' + id);
  }
}

