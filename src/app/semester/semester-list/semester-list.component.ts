import { Component, OnInit } from '@angular/core';
import { SemesterService } from '../semester.service';
import { Observable } from 'rxjs';
import { Semester } from '../../Data/Semester.data';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.css'],
})
export class SemesterListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'Name',
    'Start_date',
    'End_date',
    'Subjects',
  ];

  semester$: Observable<any>;
  element: Semester;

  ngOnInit() {
    this.semester$ = this.SemesterService.getSemesters();
    this.semester$.subscribe((result) => {
      this.element = result;
    });
  }

  constructor(private SemesterService: SemesterService) {}
}
