import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { TeacherModel } from './teacher.model';
import { TeacherFeatureState } from './teacher.reducer';
import { teacherFeatureKey } from './teacher.reducer';

export const selectFeature = createFeatureSelector<
  AppState,
  TeacherFeatureState
>(teacherFeatureKey);

export const selectTeachers = createSelector(
  selectFeature,
  (state: TeacherFeatureState) => {
    return state.teachers;
  }
);
export const selectNextTeacherId = createSelector(
  selectTeachers,
  (teacher: TeacherModel[]) => {
    return teacher.length + 1;
  }
);
