import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { TeacherService } from '../teacher.service';
import {
  TeacherActionTypes,
  teachersLoadedAction,
  teacherCreatedAction,
  teachersubjectListedAction,
} from './teacher.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextTeacherId } from '../store/teacher.selectors';
import { TeacherModel } from './teacher.model';

@Injectable()
export class TeacherEffects {
  loadTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActionTypes.teachersRequested),
      mergeMap((action) => {
        return this.teachersService.getTeachers().pipe(
          map((teachers) => teachersLoadedAction({ teachers })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  listTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActionTypes.teachersubjectlist),
      switchMap((action) =>
        this.teachersService.getTeacher(action.teacherId).pipe(
          map((teacher) => teachersubjectListedAction({ teacher })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  createTeacher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActionTypes.teacherCreate),
      concatLatestFrom((action) => this.store.select(selectNextTeacherId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.teachersService.createTeacher(action).pipe(
          map((item: any) => {
            return teacherCreatedAction({
              teacher: {
                id,
                Name: action.Name,
                Start_date: action.Start_date,
                End_date: action.End_date,
                teacherids: action.teacherids,
                teachers: action.teachers,
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
    private teachersService: TeacherService,
    private store: Store
  ) {}
}
