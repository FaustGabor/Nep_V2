import { createReducer, on, Action } from '@ngrx/store';

import { semestersLoadedAction } from './semester.actions';
import { semesterCreateAction } from './semester.actions';
import {
  semesterCreatedAction,
  semesterLoadedAction,
} from './semester.actions';
import { SemesterModel } from './semester.model';

export const semesterFeatureKey = 'semesterFeature';

export interface SemesterFeatureState {
  semesters: Array<SemesterModel>;
  semester: SemesterModel;
}

export const initialState: SemesterFeatureState = {
  semesters: [],
  semester: null,
};

export const semestersReducer = createReducer(
  initialState,
  on(semestersLoadedAction, (state, { semesters }) => ({
    ...state,
    semesters,
  })),
  on(semesterLoadedAction, (state, { semester }) => ({
    ...state,
    semester,
  })),
  on(semesterCreateAction, (state) => ({ ...state }))
);
