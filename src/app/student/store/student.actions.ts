import { createAction, props } from '@ngrx/store';
import { StudentModel } from './student.model';

export enum studentActionTypes {
  studentsRequested = '[student] student Requested',
  studentssLoaded = '[student] student Loaded',
  studentCreate = '[student] student Create',
  studentCreated = '[student] student Created',
}

export const studentsRequestedAction = createAction(
  studentActionTypes.studentsRequested
);
export const studentsLoadedAction = createAction(
  studentActionTypes.studentssLoaded,
  props<{ students: StudentModel[] }>()
);
export const studentCreateAction = createAction(
  studentActionTypes.studentCreate,
  props<{ student: StudentModel }>()
);
export const studentCreatedAction = createAction(
  studentActionTypes.studentCreated,
  props<{ student: StudentModel }>()
);
