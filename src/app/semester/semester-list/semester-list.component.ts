import { Component, OnInit, ViewChild } from '@angular/core';
import { SemesterService } from '../semester.service';
import { distinctUntilChanged, Observable, Subject, debounceTime } from 'rxjs';
import { Semester } from '../../data/Semester.data';
import { Store, select } from '@ngrx/store';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { SemesterModel } from '../store/semester.model';
import { selectSemesters } from '../store/semester.selectors';
import { semestersRequestedAction } from '../store/semester.actions';
import { MatSort, Sort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.css'],
})
export class SemesterListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'start_date',
    'end_date',
    'actions',
  ];

  semester$: Observable<SemesterModel[]> = this.store.pipe(
    select(selectSemesters)
  );

  semester_sorted = new MatTableDataSource<SemesterModel>();

  private searcher$ = new Subject<string>();

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.store.dispatch(semestersRequestedAction());
    this.semester$.subscribe(
      (data) => (this.semester_sorted = new MatTableDataSource(data))
    );

    this.searcher$
      .pipe(
        debounceTime(300), // discard emitted values that take less than the specified time between output
        distinctUntilChanged() // only emit when value has changed
      )
      .subscribe((filter: string) => {
        this.semester_sorted.filter = filter.trim().toLowerCase();
      });
  }

  constructor(private SemesterService: SemesterService, private store: Store) {}

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
