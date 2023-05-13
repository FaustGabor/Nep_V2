import { createReducer, on, Action } from '@ngrx/store';

import { semestersLoadedAction } from './semester.actions';
import { semesterCreateAction } from './semester.actions';
import { semesterCreatedAction } from './semester.actions';
import { SemesterModel } from './semester.model';

export const semesterFeatureKey = 'semesterFeature';

export interface SemesterFeatureState {
  semesters: Array<SemesterModel>;
}

export const initialState: SemesterFeatureState = {
  semesters: [],
};

export const semestersReducer = createReducer(
  initialState,
  on(semestersLoadedAction, (state, { semesters }) => ({
    ...state,
    semesters,
  })),
  on(semesterCreateAction, (state) => ({ ...state }))
);
