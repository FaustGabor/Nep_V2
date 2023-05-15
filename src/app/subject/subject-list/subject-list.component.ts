import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Observable } from 'rxjs';
import { Subject } from '../../data/Subject.data';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { SubjectModel } from '../store/subject.model';
import { selectSubjects } from '../store/subject.selectors';
import { subjectsRequestedAction } from '../store/subject.actions';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'Name',
    'Start_date',
    'End_date',
    'Subjects',
  ];

  subject$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());
  }

  constructor(private SubjectService: SubjectService, private store: Store) {}
}
