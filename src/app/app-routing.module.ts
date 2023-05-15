import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  /*
  {
    path: 'subject',
    loadChildren: () =>
      import('./subject/subject.module').then((m) => m.SubjectModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./teacher/teacher.module').then((m) => m.TeacherModule),
    canLoad: [AuthGuard],
  },
  */
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'semester',
    loadChildren: () =>
      import('./semester/semester.module').then((m) => m.SemesterModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.module').then((m) => m.BooksModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'authors',
    loadChildren: () =>
      import('./authors/authors.module').then((m) => m.AuthorsModule),
    canLoad: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
