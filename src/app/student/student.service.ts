import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { studentModel } from './store/student.model';
import { Store } from '@ngrx/store';
import { student } from '../Data/student.data';

const student_URL = 'api/student';

@Injectable()
export class studentService {
  constructor(private requestService: RequestService, private store: Store) {}

  getstudents(): Observable<student[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<student[]>(student_URL, httpOptions);
  }

  getstudent(studentId: number): Observable<any> {
    return this.requestService.get(`${student_URL}/${studentId}`);
  }

  createstudent(student: studentModel): Observable<any> {
    return this.requestService.post(`${student_URL}/`, student);
  }
}
