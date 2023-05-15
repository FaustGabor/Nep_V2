import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { SubjectService } from '../subject.service';
import {
  SubjectActionTypes,
  subjectsLoadedAction,
  subjectCreatedAction,
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
    private subjectsService: SubjectService,
    private store: Store
  ) {}
}
