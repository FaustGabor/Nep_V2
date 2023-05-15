import { createAction, props } from '@ngrx/store';
import { SubjectModel } from './subject.model';

export enum SubjectActionTypes {
  subjectsRequested = '[Subject] Subject Requested',
  subjectssLoaded = '[Subject] Subject Loaded',
  subjectCreate = '[Subject] Subject Create',
  subjectCreated = '[Subject] Subject Created',
}

export const subjectsRequestedAction = createAction(
  SubjectActionTypes.subjectsRequested
);
export const subjectsLoadedAction = createAction(
  SubjectActionTypes.subjectssLoaded,
  props<{ subjects: SubjectModel[] }>()
);
export const subjectCreateAction = createAction(
  SubjectActionTypes.subjectCreate,
  props<{ subject: SubjectModel }>()
);
export const subjectCreatedAction = createAction(
  SubjectActionTypes.subjectCreated,
  props<{ subject: SubjectModel }>()
);
