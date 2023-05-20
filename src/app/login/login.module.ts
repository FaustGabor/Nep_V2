import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';

import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { LoginRoutingModule } from './login-routing.module';
import { StudentEffects } from '../student/store/student.effects';
import { TeacherEffects } from '../teacher/store/teacher.effects';
import * as fromStudents from '../student/store/student.reducer';
import * as fromTeachers from '../teacher/store/teacher.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    LoginRoutingModule,
    StoreModule.forFeature(
      fromStudents.studentFeatureKey,
      fromStudents.studentsReducer
    ),
    EffectsModule.forFeature([StudentEffects]),
    StoreModule.forFeature(
      fromTeachers.teacherFeatureKey,
      fromTeachers.teachersReducer
    ),
    EffectsModule.forFeature([TeacherEffects]),
  ],
  declarations: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule {}
