import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { StudentModel } from './student.model';
import { studentFeatureState } from './student.reducer';
import { studentFeatureKey } from './student.reducer';

export const selectFeature = createFeatureSelector<
  AppState,
  studentFeatureState
>(studentFeatureKey);

export const selectstudents = createSelector(
  selectFeature,
  (state: studentFeatureState) => {
    return state.students;
  }
);
export const selectNextstudentId = createSelector(
  selectstudents,
  (student: StudentModel[]) => {
    return student.length + 1;
  }
);
