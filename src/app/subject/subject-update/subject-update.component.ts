import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextSubjectId } from '../store/subject.selectors';
import {
  SubjectActionTypes,
  subjectsLoadedAction,
  subjectCreateAction,
  subjectUpdateAction,
} from '../store/subject.actions';
import { Subject, Subject_Department } from '../../data/Subject.data';
import { SubjectService } from '../subject.service';
import { SubjectModel } from '../store/subject.model';
import { SubjectTable } from '../../data/Subject.data';
import { SemesterModel } from '../../semester/store/semester.model';
import {
  selectSubjects,
  selectSubject,
} from '../../subject/store/subject.selectors';
import { Observable } from 'rxjs';
import {
  subjectsRequestedAction,
  subjectRequestedAction,
} from '../../subject/store/subject.actions';
import { SemesterService } from '../../semester/semester.service';
import { map } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-subject-update',
  templateUrl: './subject-update.component.html',
  styleUrls: ['./subject-update.component.css'],
})
export class SubjectUpdateComponent implements OnInit {
  SubjectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private service: SubjectService,
    private service_sem: SemesterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());

    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            subjectRequestedAction({ subjectId: +params.get('subjectId') })
          );
        })
      )
      .subscribe();

    this.store.pipe(select(selectSubject)).subscribe((subject) => {
      console.log(subject);
      if (subject && this.SubjectForm) {
        this.SubjectForm.controls.id.setValue(subject.id);
        this.SubjectForm.controls.Name.setValue(subject.Name);
        this.SubjectForm.controls.Code.setValue(subject.Code);
        this.SubjectForm.controls.Credit.setValue(subject.Credit);
        this.SubjectForm.controls.Department.setValue(subject.Department);
        this.SubjectForm.controls.semesterids.setValue(
          subject.semesterids.toString()
        );
      }
    });

    this.SubjectForm = this.formBuilder.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
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

    this.store.dispatch(subjectUpdateAction(subjectData));

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
