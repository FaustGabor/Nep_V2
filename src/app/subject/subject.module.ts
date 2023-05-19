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

import { SubjectRoutingModule } from './subject-routing.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { SubjectComponent } from './subject/subject.component';
import { SubjectService } from './subject.service';
import { SubjectListComponent } from './subject-list/subject-list.component';
import * as fromSubjects from './store/subject.reducer';
import { SubjectEffects } from './store/subject.effects';
import { SubjectCreateComponent } from './subject-create/subject-create.component';
import { MatSortModule } from '@angular/material/sort';
import { SubjectUpdateComponent } from './subject-update/subject-update.component';

@NgModule({
  imports: [
    CommonModule,
    SubjectRoutingModule,
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
      fromSubjects.subjectFeatureKey,
      fromSubjects.subjectsReducer
    ),
    EffectsModule.forFeature([SubjectEffects]),
  ],
  declarations: [
    SubjectComponent,
    SubjectListComponent,
    SubjectCreateComponent,
    SubjectUpdateComponent,
  ],
  providers: [SubjectService],
})
export class SubjectModule {}
