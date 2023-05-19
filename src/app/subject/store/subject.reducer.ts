import { createReducer, on, Action } from '@ngrx/store';

import { subjectsLoadedAction } from './subject.actions';
import { subjectCreateAction } from './subject.actions';
import { subjectCreatedAction, subjectLoadedAction } from './subject.actions';
import { SubjectModel } from './subject.model';

export const subjectFeatureKey = 'subjectFeature';

export interface SubjectFeatureState {
  subjects: Array<SubjectModel>;
  subject: SubjectModel;
}

export const initialState: SubjectFeatureState = {
  subjects: [],
  subject: null
};

export const subjectsReducer = createReducer(
  initialState,
  on(subjectsLoadedAction, (state, { subjects }) => ({
    ...state,
    subjects,
  })),
  on(subjectLoadedAction, (state, { subject }) => ({
    ...state,
    subject,
  })),
  on(subjectCreateAction, (state) => ({ ...state }))
);
