import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { StudentModel } from './store/semester.model';
import { Store } from '@ngrx/store';
import { Student } from '../Data/Student.data';

const SEMESTER_URL = 'api/semester';

@Injectable()
export class StudentService {
  constructor(private requestService: RequestService, private store: Store) {}

  getStudents(): Observable<Student[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Student[]>(SEMESTER_URL, httpOptions);
  }

  getStudent(semesterId: number): Observable<any> {
    return this.requestService.get(`${SEMESTER_URL}/${semesterId}`);
  }

  createStudent(Student: StudentModel): Observable<any> {
    return this.requestService.post(`${SEMESTER_URL}/`, Student);
  }
}
