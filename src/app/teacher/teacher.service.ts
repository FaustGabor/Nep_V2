import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '../request.service';
import { HttpHeaders } from '@angular/common/http';
import { map, debounceTime, switchMap, tap } from 'rxjs/operators';
import { TeacherModel } from './store/teacher.model';
import { Store } from '@ngrx/store';
import { Teacher } from '../data/Teacher.data';

const TEACHER_URL = 'api/teacher';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private requestService: RequestService, private store: Store) {}

  getTeachers(): Observable<Teacher[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.requestService.get<Teacher[]>(TEACHER_URL, httpOptions);
  }

  getTeacher(teacherId: number): Observable<any> {
    return this.requestService.get<Teacher>(`${TEACHER_URL}/${teacherId}`);
  }

  createTeacher(Teacher: TeacherModel): Observable<any> {
    return this.requestService.post(`${TEACHER_URL}/`, Teacher);
  }

  updateTeacher(Teacher: TeacherModel): Observable<any> {
    return this.requestService.put(`${TEACHER_URL}/`, Teacher);
  }
}
