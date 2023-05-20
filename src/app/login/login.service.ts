import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

const Login_URL = 'api/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private requestService: RequestService, private store: Store) {}

  Login(name: string): Observable<any> {
    return this.requestService.post(`${Login_URL}/`, name);
  }
}
