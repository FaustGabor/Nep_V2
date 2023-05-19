import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Teacher } from '../../data/Teacher.data';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { TeacherModel } from '../store/teacher.model';
import { selectTeachers } from '../store/teacher.selectors';
import { teachersRequestedAction } from '../store/teacher.actions';
import { MatSort, Sort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  teacher_sorted = new MatTableDataSource<TeacherModel>();

  private searcher$ = new Subject<string>();

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.store.dispatch(teachersRequestedAction());

    this.teacher$.subscribe(
      (data) => (this.teacher_sorted = new MatTableDataSource(data))
    );

    this.searcher$
      .pipe(
        debounceTime(300), // discard emitted values that take less than the specified time between output
        distinctUntilChanged() // only emit when value has changed
      )
      .subscribe((filter: string) => {
        this.teacher_sorted.filter = filter.trim().toLowerCase();
      });
  }

  sortData(sort: Sort) {
    this.teacher_sorted.sort = this.sort;

    if (sort.direction) {
      console.log(`Sorted ${sort.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }

  applyFilter(filterValue: string) {
    this.searcher$.next(filterValue);
  }

  constructor(private TeacherService: TeacherService, private store: Store) {}
}
