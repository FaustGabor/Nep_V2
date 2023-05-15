import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { studentService } from '../student.service';
import {
  studentActionTypes,
  studentsLoadedAction,
  studentCreatedAction,
} from './student.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextstudentId } from '../store/student.selectors';
import { studentModel } from './student.model';

@Injectable()
export class studentEffects {
  loadstudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActionTypes.studentsRequested),
      mergeMap((action) => {
        return this.studentsService.getstudents().pipe(
          map((students) => studentsLoadedAction({ students })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createstudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(studentActionTypes.studentCreate),
      concatLatestFrom((action) => this.store.select(selectNextstudentId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.studentsService.createstudent(action).pipe(
          map((item: any) => {
            return studentCreatedAction({
              student: {
                id,
                Name: action.Name,
                Start_date: action.Start_date,
                End_date: action.End_date,
                subjectids: action.subjectids,
                subjects: action.subjects,
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
    private studentsService: studentService,
    private store: Store
  ) {}
}
