import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { User } from '../data/User';

const Login_URL = 'api/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private requestService: RequestService,
    private auth: AuthService
  ) {}

  Login(user: User): Observable<any> {
    console.log('login post', user);
    this.auth.setToken(user);
    return this.requestService.post(`${Login_URL}/`, user);
  }

  Logout() {
    this.auth.Logout();
  }
}
