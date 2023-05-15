import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Observable } from 'rxjs';
import { Student } from '../../data/Student.data';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { StudentModel } from '../store/student.model';
import { selectStudents } from '../store/student.selectors';
import { studentsRequestedAction } from '../store/student.actions';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'Name',
    'Start_date',
    'End_date',
    'Subjects',
  ];

  student$: Observable<StudentModel[]> = this.store.pipe(
    select(selectStudents)
  );

  ngOnInit() {
    this.store.dispatch(studentsRequestedAction());
  }

  constructor(private StudentService: StudentService, private store: Store) {}
}
