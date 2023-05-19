import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Observable, Subject as SUB, debounceTime, distinctUntilChanged } from 'rxjs';
import { Subject } from '../../data/Subject.data';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { SubjectModel } from '../store/subject.model';
import { selectSubjects } from '../store/subject.selectors';
import { subjectsRequestedAction } from '../store/subject.actions';
import { MatSort, Sort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Name', 'Code', 'Credit', 'Department'];

  subject$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  subject_sorted = new MatTableDataSource<SubjectModel>();

  private searcher$ = new SUB<string>();

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());

    this.subject$.subscribe(
      (data) => (this.subject_sorted = new MatTableDataSource(data))
    );

    this.searcher$
      .pipe(
        debounceTime(300), // discard emitted values that take less than the specified time between output
        distinctUntilChanged() // only emit when value has changed
      )
      .subscribe((filter: string) => {
        this.subject_sorted.filter = filter.trim().toLowerCase();
      });
  }

  constructor(private SubjectService: SubjectService, private store: Store) {}

  sortData(sort: Sort) {
    this.subject_sorted.sort = this.sort;

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
