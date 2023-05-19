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
  teacherLoadedAction,
  teacherUpdatedAction,
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

  createTeacher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActionTypes.teacherCreate),
      concatLatestFrom((action) => this.store.select(selectNextTeacherId)),
      switchMap(([action, id]) => {
        console.log('valami2');
        console.log(action, id);
        return this.teachersService.createTeacher(action).pipe(
          map((item: any) => {
            return teacherCreatedAction({
              teacher: {
                id,
                Name: action.name,
                Neptun: action.neptun,
                Email: action.email,
                Job: action.job,
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

  teacher = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActionTypes.teacherRequested),
      switchMap((action) =>
        this.teachersService.getTeacher(action.teacherId).pipe(
          map((teacher) => teacherLoadedAction({ teacher })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateTeacher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActionTypes.teacherUpdate),
      switchMap((action) => {
        return this.teachersService.updateTeacher(action).pipe(
          map((item: any) => {
            return teacherUpdatedAction({
              teacher: {
                id: action.id,
                Name: action.name,
                Neptun: action.neptun,
                Email: action.email,
                Job: action.job,
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
    private teachersService: TeacherService,
    private store: Store
  ) {}
}
