import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Observable } from 'rxjs';
import { Teacher } from '../../data/Teacher.data';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { TeacherModel } from '../store/teacher.model';
import { selectTeachers } from '../store/teacher.selectors';
import { teachersRequestedAction } from '../store/teacher.actions';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'Name',
    'Neptun',
    'Email',
    'Job',
    'actions',
  ];

  teacher$: Observable<TeacherModel[]> = this.store.pipe(
    select(selectTeachers)
  );

  ngOnInit() {
    this.store.dispatch(teachersRequestedAction());
  }

  constructor(private TeacherService: TeacherService, private store: Store) {}
}
