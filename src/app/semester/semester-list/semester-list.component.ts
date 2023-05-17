import { Component, OnInit } from '@angular/core';
import { SemesterService } from '../semester.service';
import { Observable } from 'rxjs';
import { Semester } from '../../data/Semester.data';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { SemesterModel } from '../store/semester.model';
import { selectSemesters } from '../store/semester.selectors';
import { semestersRequestedAction } from '../store/semester.actions';
import { Sort } from '@angular/material/sort';
import { map } from 'rxjs/operators';

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

  ngOnInit() {
    this.store.dispatch(semestersRequestedAction());
    console.log(this.semester$);
  }

  constructor(private SemesterService: SemesterService, private store: Store) {}

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
    } else {
      this.semester$ = this.semester$.pipe(
        map((result) =>
          result.sort((a, b) => {
            const aValue = (a as any)[sort.active];
            const bValue = (b as any)[sort.active];
            return (
              (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1)
            );
          })
        )
      );
    }
  }
}
