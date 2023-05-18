import { createReducer, on, Action } from '@ngrx/store';

import { teachersLoadedAction } from './teacher.actions';
import { teacherCreateAction } from './teacher.actions';
import {
  teacherCreatedAction,
  teachersubjectListedAction,
} from './teacher.actions';
import { TeacherModel } from './teacher.model';

export const teacherFeatureKey = 'teacherFeature';

export interface TeacherFeatureState {
  teachers: Array<TeacherModel>;
  teacher: TeacherModel;
}

export const initialState: TeacherFeatureState = {
  teachers: [],
  teacher: null,
};

export const teachersReducer = createReducer(
  initialState,
  on(teachersLoadedAction, (state, { teachers }) => ({
    ...state,
    teachers,
  })),
  on(teachersubjectListedAction, (state, { teacher }) => ({
    ...state,
    teacher,
  })),
  on(teacherLoadedAction, (state, { semester }) => ({
    ...state,
    teacher,
  })),
  on(teacherCreateAction, (state) => ({ ...state }))
);
