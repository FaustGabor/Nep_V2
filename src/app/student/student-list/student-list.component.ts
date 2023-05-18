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
    'Neptun',
    'Email',
    'Field_of_study',
  ];

  student$: Observable<StudentModel[]> = this.store.pipe(
    select(selectStudents)
  );

  ngOnInit() {
    this.store.dispatch(studentsRequestedAction());
  }

  constructor(private StudentService: StudentService, private store: Store) {}

  sortData(sort: Sort) {
    this.semester_sorted.sort = this.sort;

    if (sort.direction) {
      console.log(`Sorted ${sort.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }

  applyFilter(filterValue: string) {
    this.searcher$.next(filterValue);
  }
}
