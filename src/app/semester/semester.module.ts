import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { SemesterRoutingModule } from './semester-routing.module';
import { RouterModule } from '@angular/router';
import { SemesterComponent } from './semester/semester.component';
import { SemesterService } from './semester.service';
import { SemesterListComponent } from './semester-list/semester-list.component';

@NgModule({
  imports: [
    CommonModule,
    SemesterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
  ],
  declarations: [SemesterComponent, SemesterListComponent],
  providers: [SemesterService],
})
export class SemesterModule {}
