import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<any>;

  constructor(private tokenService: TokenService) {
    this.currentTokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentToken')));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): any {
    return this.currentTokenSubject.value;
  }

  login(userdata: any) {
    return this.tokenService.post(userdata)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentToken', JSON.stringify(user));
        this.currentTokenSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentToken');
    this.currentTokenSubject.next(null);
  }
}
