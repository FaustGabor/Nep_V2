import { createAction, props } from '@ngrx/store';
import { StudentModel } from './student.model';

export enum StudentActionTypes {
  studentsRequested = '[Student] Student Requested',
  studentssLoaded = '[Student] Student Loaded',
  studentCreate = '[Student] Student Create',
  studentCreated = '[Student] Student Created',
}

export const studentsRequestedAction = createAction(
  StudentActionTypes.studentsRequested
);
export const studentsLoadedAction = createAction(
  StudentActionTypes.studentssLoaded,
  props<{ students: StudentModel[] }>()
);
export const studentCreateAction = createAction(
  StudentActionTypes.studentCreate,
  props<{ student: StudentModel }>()
);
export const studentCreatedAction = createAction(
  StudentActionTypes.studentCreated,
  props<{ student: StudentModel }>()
);
