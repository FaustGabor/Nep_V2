import { createAction, props } from '@ngrx/store';
import { TeacherModel } from './teacher.model';

export enum TeacherActionTypes {
  teachersRequested = '[Teacher] Teacher Requested',
  teacherssLoaded = '[Teacher] Teacher Loaded',
  teacherCreate = '[Teacher] Teacher Create',
  teacherCreated = '[Teacher] Teacher Created',
  teachersubjectlist = '[Teacher] Teacher Subject list',
  teachersubjectlisted = '[Teacher] Teacher Subject listed',
}

// get teachers:
export const teachersRequestedAction = createAction(
  TeacherActionTypes.teachersRequested
);
export const teachersLoadedAction = createAction(
  TeacherActionTypes.teacherssLoaded,
  props<{ teachers: TeacherModel[] }>()
);
// list teachers
export const teachersubjectListAction = createAction(
  TeacherActionTypes.teachersubjectlist,
  props<{ teacherId: number }>()
);
export const teachersubjectListedAction = createAction(
  TeacherActionTypes.teachersubjectlisted,
  props<{ teacher: TeacherModel }>()
);
// create teachers
export const teacherCreateAction = createAction(
  TeacherActionTypes.teacherCreate,
  props<{ teacher: TeacherModel }>()
);
export const teacherCreatedAction = createAction(
  TeacherActionTypes.teacherCreated,
  props<{ teacher: TeacherModel }>()
);
