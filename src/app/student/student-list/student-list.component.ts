import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Student } from '../../data/Student.data';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { StudentModel } from '../store/student.model';
import { selectStudents } from '../store/student.selectors';
import { studentsRequestedAction } from '../store/student.actions';
import { MatSort, Sort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
    'actions',
  ];

  student$: Observable<StudentModel[]> = this.store.pipe(
    select(selectStudents)
  );

  student_sorted = new MatTableDataSource<StudentModel>();

  private searcher$ = new Subject<string>();

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.store.dispatch(studentsRequestedAction());

    this.student$.subscribe(
      (data) => (this.student_sorted = new MatTableDataSource(data))
    );

    this.searcher$
      .pipe(
        debounceTime(300), // discard emitted values that take less than the specified time between output
        distinctUntilChanged() // only emit when value has changed
      )
      .subscribe((filter: string) => {
        this.student_sorted.filter = filter.trim().toLowerCase();
      });
  }

  constructor(private StudentService: StudentService, private store: Store) {}

  sortData(sort: Sort) {
    this.student_sorted.sort = this.sort;

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
