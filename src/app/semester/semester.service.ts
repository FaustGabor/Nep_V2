import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { Semester } from '../Data/Semester.data';

const SEMESTER_URL = 'api/semester';

@Injectable()
export class SemesterService {
  constructor(private requestService: RequestService) {}

  getSemesters(): Observable<Semester[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Semester[]>(SEMESTER_URL, httpOptions);
  }

  getSemester(bookId: number): Observable<any> {
    return this.requestService.get(`${SEMESTER_URL}/${bookId}`);
  }
}