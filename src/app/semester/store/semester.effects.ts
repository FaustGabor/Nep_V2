import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { SemesterService } from '../semester.service';
import {
  SemesterActionTypes,
  semestersLoadedAction,
  semesterCreatedAction,
} from './semester.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextSemesterId } from '../store/semester.selectors';
import { SemesterModel } from './semester.model';

@Injectable()
export class SemesterEffects {
  loadSemesters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SemesterActionTypes.semestersRequested),
      mergeMap((action) => {
        return this.semestersService.getSemesters().pipe(
          map((semesters) => semestersLoadedAction({ semesters })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createSemester$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SemesterActionTypes.semesterCreate),
      concatLatestFrom((action) => this.store.select(selectNextSemesterId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.semestersService.createSemester(action).pipe(
          map((item: any) => {
            return semesterCreatedAction({
              semester: {
                id,
                name: action.name,
                start_date: action.start_date,
                end_date: action.end_date,
                deleted: false,
              },
            });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private semestersService: SemesterService,
    private store: Store
  ) {}
}
