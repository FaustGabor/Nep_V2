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

import { SemesterRoutingModule } from './semester-routing.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { SemesterComponent } from './semester/semester.component';
import { SemesterService } from './semester.service';
import { SemesterListComponent } from './semester-list/semester-list.component';
import * as fromSemesters from './store/semester.reducer';
import { SemesterEffects } from './store/semester.effects';
import { SemesterCreateComponent } from './semester-create/semester-create.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    SemesterRoutingModule,
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
      fromSemesters.semesterFeatureKey,
      fromSemesters.semestersReducer
    ),
    EffectsModule.forFeature([SemesterEffects]),
  ],
  declarations: [
    SemesterComponent,
    SemesterListComponent,
    SemesterCreateComponent,
  ],
  providers: [SemesterService],
})
export class SemesterModule {}
