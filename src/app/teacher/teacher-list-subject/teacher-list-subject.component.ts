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
  selector: 'app-teacher-list-subject',
  templateUrl: './teacher-list-subject.component.html',
  styleUrls: ['./teacher-list-subject.component.css'],
})
export class TeacherListSubjectComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Name', 'SemesterName', 'Subjects'];

  teacher_subject$: Observable<any>;
  

  ngOnInit() {
    this.events$ = this.eventService.getEvents();
    this.events$.subscribe((result) => {
      this.events = result;
    });
  }

  constructor(private TeacherService: TeacherService, private store: Store) {}
}
