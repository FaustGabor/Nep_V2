import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Observable } from 'rxjs';
import { Teacher } from '../../data/Teacher.data';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { TeacherModel } from '../store/teacher.model';
import { selectTeachers } from '../store/teacher.selectors';
import { teachersubjectListAction } from '../store/teacher.actions';

@Component({
  selector: 'app-teacher-list-subject',
  templateUrl: './teacher-list-subject.component.html',
  styleUrls: ['./teacher-list-subject.component.css'],
})
export class TeacherListSubjectComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Name', 'SemesterName', 'Subjects'];

  teacher$: Observable<TeacherModel[]> = this.store.pipe(
    select(selectLoadedTeacher)
  );

  ngOnInit() {
    this.store.dispatch(teachersubjectListAction({ teacherId: 1 }));
  }

  constructor(private TeacherService: TeacherService, private store: Store) {}
}
