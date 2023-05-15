import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import { TeacherListSubjectComponent } from './teacher-list-subject/teacher-list-subject.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: TeacherListComponent,
          },
          {
            path: 'list_subject',
            component: TeacherListSubjectComponent,
          },
          {
            path: 'create',
            component: TeacherCreateComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/teacher', pathMatch: 'full' },
  { path: '**', component: TeacherListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
