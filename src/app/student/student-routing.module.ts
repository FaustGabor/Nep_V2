import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { studentListComponent } from './student-list/student-list.component';
import { studentComponent } from './student/student.component';
import { StudentCreateComponent } from './student-create/student-create.component';

const routes: Routes = [
  {
    path: '',
    component: studentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: studentListComponent,
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
  { path: '**', component: studentListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class studentRoutingModule {}
