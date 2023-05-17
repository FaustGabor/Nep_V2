import { Component, OnInit, ViewChild } from '@angular/core';
import { SemesterService } from '../semester.service';
import { Observable } from 'rxjs';
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
  displayedColumns: string[] = ['id', 'Name', 'Start_date', 'End_date'];

  semester$: Observable<SemesterModel[]> = this.store.pipe(
    select(selectSemesters)
  );

  semester_sorted = new MatTableDataSource<SemesterModel>();

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.store.dispatch(semestersRequestedAction());
    this.semester$.subscribe(
      (data) => (this.semester_sorted = new MatTableDataSource(data))
    );
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
}
