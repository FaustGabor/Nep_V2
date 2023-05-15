import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { StudentModel } from './semester.model';
import { StudentFeatureState } from './semester.reducer';
import { semesterFeatureKey } from './semester.reducer';

export const selectFeature = createFeatureSelector<
  AppState,
  StudentFeatureState
>(semesterFeatureKey);

export const selectStudents = createSelector(
  selectFeature,
  (state: StudentFeatureState) => {
    return state.semesters;
  }
);
export const selectNextStudentId = createSelector(
  selectStudents,
  (semester: StudentModel[]) => {
    return semester.length + 1;
  }
);
