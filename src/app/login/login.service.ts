import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthInterceptor } from '../http-interceptors/auth-interceptor';

const Login_URL = 'api/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private requestService: RequestService,
    private auth: AuthInterceptor
  ) {}

  Login(name: string): Observable<any> {
    console.log('login post', name);
    this.auth.setToken(name);
    return this.requestService.post(`${Login_URL}/`, name);
  }
}
