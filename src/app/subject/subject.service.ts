import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { SubjectModel } from './store/semester.model';
import { Store } from '@ngrx/store';
import { Subject } from '../Data/Subject.data';

const SEMESTER_URL = 'api/semester';

@Injectable()
export class SubjectService {
  constructor(private requestService: RequestService, private store: Store) {}

  getSubjects(): Observable<Subject[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Subject[]>(SEMESTER_URL, httpOptions);
  }

  getSubject(semesterId: number): Observable<any> {
    return this.requestService.get(`${SEMESTER_URL}/${semesterId}`);
  }

  createSubject(Subject: SubjectModel): Observable<any> {
    return this.requestService.post(`${SEMESTER_URL}/`, Subject);
  }
}
