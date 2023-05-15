import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentComponent } from './student/student.component';
import { StudentCreateComponent } from './student-create/student-create.component';

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
          /*
        {
          path: 'details/:eventId',
          component: EventDetailsComponent
        },
                */
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
