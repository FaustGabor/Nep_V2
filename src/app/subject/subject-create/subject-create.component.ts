import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextSubjectId } from '../store/subject.selectors';
import {
  SubjectActionTypes,
  subjectsLoadedAction,
  subjectCreateAction,
} from '../store/subject.actions';
import { Subject, Subject_Department } from '../../data/Subject.data';
import { SubjectService } from '../subject.service';
import { SubjectModel } from '../store/subject.model';
import { SubjectTable } from '../../data/Subject.data';
import { SemesterModel } from '../../semester/store/semester.model';
import { selectSubjects } from '../../subject/store/subject.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subject/store/subject.actions';
import { SemesterService } from '../../semester/semester.service';

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css'],
})
export class SubjectCreateComponent implements OnInit {
  SubjectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private service: SubjectService,
    private service_sem: SemesterService
  ) {}

  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());

    this.SubjectForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.maxLength(50)]],
      Code: ['', [Validators.required, Validators.maxLength(30)]],
      Credit: ['', [Validators.required]],
      Department: ['', [Validators.required]],
      semesterids: ['', [Validators.required]],
      semesters: [],
    });
  }

  onSubmit(subjectData: any) {
    subjectData.deleted = false;
    subjectData.semesters = [];
    subjectData.semesterids = subjectData.semesterids.split(',');

    subjectData.semesterids.forEach((x) => {
      const semester = this.service_sem.getSemester(x);

      if (semester != undefined) subjectData.semesters.push(semester);
    });

    this.store.dispatch(subjectCreateAction(subjectData));

    this.SubjectForm.reset();
    this.router.navigate(['/subject']);
  }

  get name() {
    return this.SubjectForm.get('Name');
  }
  get code() {
    return this.SubjectForm.get('Code');
  }
  get credit() {
    return this.SubjectForm.get('Credit');
  }
  get department() {
    return this.SubjectForm.get('Department');
  }
  get semesterids() {
    return [this.SubjectForm.get('semesterids')];
  }
}
