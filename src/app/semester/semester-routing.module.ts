import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SemesterListComponent } from './semester-list/semester-list.component';
import { SemesterComponent } from './semester/semester.component';
import { SemesterCreateComponent } from './semester-create/semester-create.component';

const routes: Routes = [
  {
    path: '',
    component: SemesterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: SemesterListComponent,
          },
          /*
        {
          path: 'details/:eventId',
          component: EventDetailsComponent
        },
                */
          {
            path: 'create',
            component: SemesterCreateComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/semester', pathMatch: 'full' },
  { path: '**', component: SemesterListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemesterRoutingModule {}
