import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { StudentService } from '../student.service';
import {
  StudentActionTypes,
  studentsLoadedAction,
  studentCreatedAction,
  studentLoadedAction,
} from './student.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextStudentId } from '../store/student.selectors';
import { StudentModel } from './student.model';

@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActionTypes.studentsRequested),
      mergeMap((action) => {
        return this.studentsService.getStudents().pipe(
          map((students) => studentsLoadedAction({ students })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActionTypes.studentCreate),
      concatLatestFrom((action) => this.store.select(selectNextStudentId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.studentsService.createStudent(action).pipe(
          map((item: any) => {
            return studentCreatedAction({
              student: {
                id,
                Name: action.Name,
                Neptun: action.Neptun,
                Email: action.Email,
                Field_of_study: action.Field_of_study,
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

  student = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActionTypes.studentRequested),
      switchMap((action) =>
        this.studentsService.getStudent(action.studentId).pipe(
          map((student) => studentLoadedAction({ student })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActionTypes.studentUpdate),
      switchMap((action) => {
        return this.studentsService.updateStudent(action).pipe(
          map((item: any) => {
            return studentUpdatedAction({
              student: {
                id: action.id,
                Name: action.Name,
                Neptun: action.Neptun,
                Email: action.Email,
                Field_of_study: action.Field_of_study,
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
    private studentsService: StudentService,
    private store: Store
  ) {}
}
