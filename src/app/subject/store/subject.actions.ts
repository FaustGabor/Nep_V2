import { createAction, props } from '@ngrx/store';
import { SubjectModel } from './subject.model';

export enum SubjectActionTypes {
  subjectsRequested = '[Subject] Subject Requested',
  subjectssLoaded = '[Subject] Subject Loaded',
  subjectCreate = '[Subject] Subject Create',
  subjectCreated = '[Subject] Subject Created',

  subjectRequested = '[Subject] Subject Requested',
  subjectLoaded = '[Subject] Subject Loaded',
  subjectUpdate = '[Subject] Subject update',
  subjectUpdated = '[Subject] Subject updated',
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

export const subjectUpdateAction = createAction(
  SubjectActionTypes.subjectUpdate,
  props<{ subject: SubjectModel }>()
);
export const subjectUpdatedAction = createAction(
  SubjectActionTypes.subjectUpdated,
  props<{ subject: SubjectModel }>()
);

export const ssubjectRequestedAction = createAction(
  SubjectActionTypes.subjectRequested,
  props<{ subjectId: number }>()
);
export const subjectLoadedAction = createAction(
  SubjectActionTypes.subjectLoaded,
  props<{ subject: SubjectModel }>()
);
