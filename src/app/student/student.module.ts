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

import { studentRoutingModule } from './student-routing.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { studentComponent } from './student/student.component';
import { studentService } from './student.service';
import { studentListComponent } from './student-list/student-list.component';
import * as fromstudents from './store/student.reducer';
import { studentEffects } from './store/student.effects';
import { StudentCreateComponent } from './student-create/student-create.component';

@NgModule({
  imports: [
    CommonModule,
    studentRoutingModule,
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
    StoreModule.forFeature(
      fromstudents.studentFeatureKey,
      fromstudents.studentsReducer
    ),
    EffectsModule.forFeature([studentEffects]),
  ],
  declarations: [
    studentComponent,
    studentListComponent,
    StudentCreateComponent,
  ],
  providers: [studentService],
})
export class studentModule {}
