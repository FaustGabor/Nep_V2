import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { SubjectUpdateComponent } from './subject-update/subject-update.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: SubjectListComponent,
          },
          {
            path: 'edit/:subjectId',
            component: SubjectUpdateComponent,
          },
          {
            path: 'create',
            component: SubjectCreateComponent,
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: '/subject', pathMatch: 'full' },
  { path: '**', component: SubjectListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectRoutingModule {}
