import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { SemesterModel } from './semester.model';
import { SemesterFeatureState } from './semester.reducer';
import { semesterFeatureKey } from './semester.reducer';

export const selectFeature = createFeatureSelector<
  AppState,
  SemesterFeatureState
>(semesterFeatureKey);

export const selectSemesters = createSelector(
  selectFeature,
  (state: SemesterFeatureState) => {
    return state.semesters;
  }
);

export const selectSemester = createSelector(
  selectFeature,
  (state: SemesterFeatureState) => {
    return state.semester;
  }
);

export const selectNextSemesterId = createSelector(
  selectSemesters,
  (semester: SemesterModel[]) => {
    return semester.length + 1;
  }
);
