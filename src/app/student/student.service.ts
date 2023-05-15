import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { studentModel } from './store/student.model';
import { Store } from '@ngrx/store';
import { Student } from '../Data/student.data';

const student_URL = 'api/student';

@Injectable()
export class StudentService {
  constructor(private requestService: RequestService, private store: Store) {}

  getstudents(): Observable<Student[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Student[]>(student_URL, httpOptions);
  }

  getstudent(studentId: number): Observable<any> {
    return this.requestService.get(`${student_URL}/${studentId}`);
  }

  createstudent(student: studentModel): Observable<any> {
    return this.requestService.post(`${student_URL}/`, student);
  }
}
