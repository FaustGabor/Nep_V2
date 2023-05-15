import { createAction, props } from '@ngrx/store';
import { studentModel } from './student.model';

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
  props<{ students: studentModel[] }>()
);
export const studentCreateAction = createAction(
  studentActionTypes.studentCreate,
  props<{ student: studentModel }>()
);
export const studentCreatedAction = createAction(
  studentActionTypes.studentCreated,
  props<{ student: studentModel }>()
);
