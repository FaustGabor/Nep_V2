import { createReducer, on, Action } from '@ngrx/store';

import { studentsLoadedAction } from './student.actions';
import { studentCreateAction } from './student.actions';
import { studentCreatedAction, studentLoadedAction } from './student.actions';
import { StudentModel } from './student.model';

export const studentFeatureKey = 'studentFeature';

export interface StudentFeatureState {
  students: Array<StudentModel>;
  student: StudentModel;
}

export const initialState: StudentFeatureState = {
  students: [],
  student: null,
};

export const studentsReducer = createReducer(
  initialState,
  on(studentsLoadedAction, (state, { students }) => ({
    ...state,
    students,
  })),
  on(studentLoadedAction, (state, { student }) => ({
    ...state,
    student,
  })),
  on(studentCreateAction, (state) => ({ ...state }))
);
