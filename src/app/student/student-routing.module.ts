import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentComponent } from './student/student.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { StudentListSubjectComponent } from './student-list-subject/student-list-subject.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: StudentListComponent,
          },
          {
            path: 'list_subject/:studentId/:semesterId',
            component: StudentListSubjectComponent,
          },
          {
            path: 'edit/:studentId',
            component: StudentUpdateComponent,
          },
          {
            path: 'create',
            component: StudentCreateComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/student', pathMatch: 'full' },
  { path: '**', component: StudentListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
