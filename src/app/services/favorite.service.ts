import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(environment.apiURL + '/favorite');
  }

  post(favorite: any) {
    return this.http.post(environment.apiURL + '/favorite', favorite);
  }


  delete(favoriteId: any) {
    return this.http.delete(environment.apiURL + '/favorite/' + favoriteId);
  }
}
