import { createAction, props } from '@ngrx/store';
import { SemesterModel } from './semester.model';

export enum SemesterActionTypes {
  semestersRequested = '[Semester] Semester Requested',
  semesterssLoaded = '[Semester] Semester Loaded',
  semesterCreate = '[Semester] Semester Create',
  semesterCreated = '[Semester] Semester Created',
}

export const semestersRequestedAction = createAction(
  SemesterActionTypes.semestersRequested
);
export const semestersLoadedAction = createAction(
  SemesterActionTypes.semesterssLoaded,
  props<{ semesters: SemesterModel[] }>()
);
export const semesterCreateAction = createAction(
  SemesterActionTypes.semesterCreate,
  props<{ semester: SemesterModel }>()
);
export const semesterCreatedAction = createAction(
  SemesterActionTypes.semesterCreated,
  props<{ semester: SemesterModel }>()
);
