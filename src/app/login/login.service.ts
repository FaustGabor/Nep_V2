import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';

const Login_URL = 'api/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private requestService: RequestService) {}

  Login(name: string): Observable<any> {
    console.log('login', name);
    return this.requestService.post(`${Login_URL}/`, name);
  }
}
