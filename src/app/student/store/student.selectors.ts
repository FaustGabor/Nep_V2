import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { StudentModel } from './student.model';
import { StudentFeatureState } from './student.reducer';
import { studentFeatureKey } from './student.reducer';

export const selectFeature = createFeatureSelector<
  AppState,
  StudentFeatureState
>(studentFeatureKey);

export const selectStudents = createSelector(
  selectFeature,
  (state: StudentFeatureState) => {
    return state.students;
  }
);

export const selectStudent = createSelector(
  selectFeature,
  (state: StudentFeatureState) => {
    return state.student;
  }
);

export const selectNextStudentId = createSelector(
  selectStudents,
  (student: StudentModel[]) => {
    return student.length + 1;
  }
);
