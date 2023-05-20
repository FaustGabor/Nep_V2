import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';

const STUDENT_URL = 'api/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private requestService: RequestService) {}
}
