import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { SubjectModel } from './store/subject.model';
import { Store } from '@ngrx/store';
import { Subject } from '../data/Subject.data';

const SUBJECT_URL = 'api/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private requestService: RequestService, private store: Store) {}

  getSubjects(): Observable<Subject[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Subject[]>(SUBJECT_URL, httpOptions);
  }

  getSubject(subjectId: number): Observable<any> {
    return this.requestService.get(`${SUBJECT_URL}/${subjectId}`);
  }

  createSubject(Subject: SubjectModel): Observable<any> {
    return this.requestService.post(`${SUBJECT_URL}/`, Subject);
  }
}
