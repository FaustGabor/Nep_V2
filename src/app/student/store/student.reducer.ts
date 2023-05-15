import { createReducer, on, Action } from '@ngrx/store';

import { studentsLoadedAction } from './student.actions';
import { studentCreateAction } from './student.actions';
import { studentCreatedAction } from './student.actions';
import { studentModel } from './student.model';

export const studentFeatureKey = 'studentFeature';

export interface studentFeatureState {
  students: Array<studentModel>;
}

export const initialState: studentFeatureState = {
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