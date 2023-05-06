import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SemesterListComponent } from './semester-list/semester-list.component';
import { SemesterComponent } from './semester/semester.component';

const routes: Routes = [
  {
    path: '',
    component: SemesterComponent,
    children: [
      {
        path: '',
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
        {
          path: 'create',
          component: BooksCreateComponent
        }
        */
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
