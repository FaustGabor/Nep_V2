import { createReducer, on, Action } from '@ngrx/store';

import { subjectsLoadedAction } from './subject.actions';
import { subjectCreateAction } from './subject.actions';
import { subjectCreatedAction } from './subject.actions';
import { SubjectModel } from './subject.model';

export const subjectFeatureKey = 'subjectFeature';

export interface SubjectFeatureState {
  subjects: Array<SubjectModel>;
}

export const initialState: SubjectFeatureState = {
  subjects: [],
};

export const subjectsReducer = createReducer(
  initialState,
  on(subjectsLoadedAction, (state, { subjects }) => ({
    ...state,
    subjects,
  })),
  on(subjectCreateAction, (state) => ({ ...state }))
);
