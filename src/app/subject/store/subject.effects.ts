import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { SubjectService } from '../subject.service';
import {
  SubjectActionTypes,
  subjectsLoadedAction,
  subjectCreatedAction,
  subjectLoadedAction,
  subjectUpdatedAction,
} from './subject.actions';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { selectNextSubjectId } from '../store/subject.selectors';
import { SubjectModel } from './subject.model';

@Injectable()
export class SubjectEffects {
  loadSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActionTypes.subjectsRequested),
      mergeMap((action) => {
        return this.subjectsService.getSubjects().pipe(
          map((subjects) => subjectsLoadedAction({ subjects })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActionTypes.subjectCreate),
      concatLatestFrom((action) => this.store.select(selectNextSubjectId)),
      switchMap(([action, id]) => {
        console.log(action, id);
        return this.subjectsService.createSubject(action).pipe(
          map((item: any) => {
            return subjectCreatedAction({
              subject: {
                id,
                Name: action.Name,
                Code: action.Code,
                Credit: action.Credit,
                Department: action.Department,
                semesterids: action.semesterids,
                semesters: action.semesters,
                deleted: false,
              },
            });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  subject = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActionTypes.subjectRequested),
      switchMap((action) =>
        this.subjectsService.getSubject(action.subjectId).pipe(
          map((subject) => subjectLoadedAction({ subject })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubjectActionTypes.subjectUpdate),
      switchMap((action) => {
        return this.subjectsService.updateSubject(action).pipe(
          map((item: any) => {
            return subjectUpdatedAction({
              subject: {
                id: action.id,
                Name: action.Name,
                Code: action.Code,
                Credit: action.Credit,
                Department: action.Department,
                semesterids: action.semesterids,
                semesters: action.semesters,
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
    private subjectsService: SubjectService,
    private store: Store
  ) {}
}
