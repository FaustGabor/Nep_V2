import { createReducer, on, Action } from '@ngrx/store';

import { teachersLoadedAction } from './teacher.actions';
import { teacherCreateAction } from './teacher.actions';
import { teacherCreatedAction } from './teacher.actions';
import { TeacherModel } from './teacher.model';

export const teacherFeatureKey = 'teacherFeature';

export interface TeacherFeatureState {
  teachers: Array<TeacherModel>;
}

export const initialState: TeacherFeatureState = {
  teachers: [],
};

export const teachersReducer = createReducer(
  initialState,
  on(teachersLoadedAction, (state, { teachers }) => ({
    ...state,
    teachers,
  })),
  on(teacherCreateAction, (state) => ({ ...state }))
);
