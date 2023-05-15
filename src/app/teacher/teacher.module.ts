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

import { TeacherRoutingModule } from './teacher-routing.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherService } from './teacher.service';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import * as fromTeachers from './store/teacher.reducer';
import { TeacherEffects } from './store/teacher.effects';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';

@NgModule({
  imports: [
    CommonModule,
    TeacherRoutingModule,
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
      fromTeachers.teacherFeatureKey,
      fromTeachers.teachersReducer
    ),
    EffectsModule.forFeature([TeacherEffects]),
  ],
  declarations: [
    TeacherComponent,
    TeacherListComponent,
    TeacherCreateComponent,
  ],
  providers: [TeacherService],
})
export class TeacherModule {}
