import { createReducer, on, Action } from '@ngrx/store';

import { studentsLoadedAction } from './student.actions';
import { studentCreateAction } from './student.actions';
import { studentCreatedAction } from './student.actions';
import { StudentModel } from './student.model';

export const studentFeatureKey = 'studentFeature';

export interface StudentFeatureState {
  students: Array<StudentModel>;
}

export const initialState: StudentFeatureState = {
  students: [],
};

export const studentsReducer = createReducer(
  initialState,
  on(studentsLoadedAction, (state, { students }) => ({
    ...state,
    students,
  })),
  on(studentCreateAction, (state) => ({ ...state }))
);
