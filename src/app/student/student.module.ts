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

import { StudentRoutingModule } from './student-routing.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StudentComponent } from './student/student.component';
import { StudentService } from './student.service';
import { StudentListComponent } from './student-list/student-list.component';
import * as fromStudents from './store/student.reducer';
import { StudentEffects } from './store/student.effects';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { MatSortModule } from '@angular/material/sort';
import * as fromSubjects from '../subject/store/subject.reducer';
import { SubjectEffects } from '../subject/store/subject.effects';
import { StudentListSubjectComponent } from './student-list-subject/student-list-subject.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    StoreModule.forFeature(
      fromStudents.studentFeatureKey,
      fromStudents.studentsReducer
    ),
    EffectsModule.forFeature([StudentEffects]),
    StoreModule.forFeature(
      fromSubjects.subjectFeatureKey,
      fromSubjects.subjectsReducer
    ),
    EffectsModule.forFeature([SubjectEffects]),
  ],
  declarations: [
    StudentComponent,
    StudentListComponent,
    StudentCreateComponent,
    StudentUpdateComponent,
    StudentListSubjectComponent,
  ],
  providers: [StudentService],
})
export class StudentModule {}
