import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../app.module';
import { SubjectModel } from './subject.model';
import { SubjectFeatureState } from './subject.reducer';
import { subjectFeatureKey } from './subject.reducer';

export const selectFeature = createFeatureSelector<
  AppState,
  SubjectFeatureState
>(subjectFeatureKey);

export const selectSubjects = createSelector(
  selectFeature,
  (state: SubjectFeatureState) => {
    return state.subjects;
  }
);
export const selectNextSubjectId = createSelector(
  selectSubjects,
  (subject: SubjectModel[]) => {
    return subject.length + 1;
  }
);
