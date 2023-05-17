import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { StudentModel } from './store/student.model';
import { Store } from '@ngrx/store';
import { Student } from '../data/Student.data';

const STUDENT_URL = 'api/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private requestService: RequestService, private store: Store) {}

  getStudents(): Observable<Student[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Student[]>(STUDENT_URL, httpOptions);
  }

  getStudent(studentId: number): Observable<any> {
    return this.requestService.get<Student>(`${STUDENT_URL}/${studentId}`);
  }

  createStudent(Student: StudentModel): Observable<any> {
    return this.requestService.post(`${STUDENT_URL}/`, Student);
  }
}
