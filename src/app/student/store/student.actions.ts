import { createAction, props } from '@ngrx/store';
import { StudentModel } from './student.model';

export enum StudentActionTypes {
  studentsRequested = '[Student] Student Requested',
  studentssLoaded = '[Student] Student Loaded',
  studentCreate = '[Student] Student Create',
  studentCreated = '[Student] Student Created',

  studentRequested = '[Student] Student Requested',
  studentLoaded = '[Student] Student Loaded',
  studentUpdate = '[Student] Student update',
  studentUpdated = '[Student] Student updated',
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

export const studentUpdateAction = createAction(
  StudentActionTypes.studentUpdate,
  props<{ student: StudentModel }>()
);
export const studentUpdatedAction = createAction(
  StudentActionTypes.studentUpdated,
  props<{ student: StudentModel }>()
);

export const studentRequestedAction = createAction(
  StudentActionTypes.studentRequested,
  props<{ studentId: number }>()
);
export const studentLoadedAction = createAction(
  StudentActionTypes.studentLoaded,
  props<{ student: StudentModel }>()
);
