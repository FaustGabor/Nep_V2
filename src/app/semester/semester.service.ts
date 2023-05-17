import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { SemesterModel } from './store/semester.model';
import { Store } from '@ngrx/store';
import { Semester } from '../data/Semester.data';

const SEMESTER_URL = 'api/semester';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  constructor(private requestService: RequestService, private store: Store) {}

  getSemesters(): Observable<Semester[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Semester[]>(SEMESTER_URL, httpOptions);
  }

  getSemester(semesterId: number): Observable<any> {
    return this.requestService.get<Semester>(`${SEMESTER_URL}/${semesterId}`);
  }

  createSemester(Semester: SemesterModel): Observable<any> {
    return this.requestService.post(`${SEMESTER_URL}/`, Semester);
  }
}
