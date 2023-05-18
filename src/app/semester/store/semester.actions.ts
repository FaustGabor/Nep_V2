import { createAction, props } from '@ngrx/store';
import { SemesterModel } from './semester.model';

export enum SemesterActionTypes {
  semestersRequested = '[Semester] Semesters Requested',
  semesterssLoaded = '[Semester] Semesters Loaded',
  semesterCreate = '[Semester] Semester Create',
  semesterCreated = '[Semester] Semester Created',
  semesterRequested = '[Semester] Semester Requested',
  semesterLoaded = '[Semester] Semester Loaded',
  semesterUpdate = '[Semester] Semester update',
  semesterUpdated = '[Semester] Semester updated',
}

export const semestersRequestedAction = createAction(
  SemesterActionTypes.semestersRequested
);
export const semestersLoadedAction = createAction(
  SemesterActionTypes.semesterssLoaded,
  props<{ semesters: SemesterModel[] }>()
);

export const semesterRequestedAction = createAction(
  SemesterActionTypes.semesterRequested,
  props<{ semesterId: number }>()
);
export const semesterLoadedAction = createAction(
  SemesterActionTypes.semesterLoaded,
  props<{ semester: SemesterModel }>()
);

export const semesterCreateAction = createAction(
  SemesterActionTypes.semesterCreate,
  props<{ semester: SemesterModel }>()
);
export const semesterCreatedAction = createAction(
  SemesterActionTypes.semesterCreated,
  props<{ semester: SemesterModel }>()
);

export const semesterUpdateAction = createAction(
  SemesterActionTypes.semesterUpdate,
  props<{ teacher: SemesterModel }>()
);
export const semesterUpdatedAction = createAction(
  SemesterActionTypes.semesterUpdated,
  props<{ teacher: SemesterModel }>()
);
