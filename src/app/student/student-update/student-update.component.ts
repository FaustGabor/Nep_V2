import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextStudentId, selectStudent } from '../store/student.selectors';
import {
  StudentActionTypes,
  studentsLoadedAction,
  studentCreateAction,
  studentRequestedAction,
  studentUpdateAction,
} from '../store/student.actions';
import { Student, Student_Fields } from '../../data/Student.data';
import { StudentService } from '../student.service';
import { StudentModel } from '../store/student.model';
import { SubjectTable } from '../../data/Subject.data';
import { SubjectModel } from '../../subject/store/subject.model';
import { selectSubjects } from '../../subject/store/subject.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subject/store/subject.actions';
import { SubjectService } from '../../subject/subject.service';
import { regExValidator } from '../../validators/regex.validator';
import { map } from 'rxjs';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css'],
})
export class StudentUpdateComponent implements OnInit {
  StudentForm: FormGroup;
  subjectlist: SubjectModel[];

  subject$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private service: StudentService,
    private service_sub: SubjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());

    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            studentRequestedAction({ studentId: +params.get('studentId') })
          );
        })
      )
      .subscribe();

    this.store.pipe(select(selectStudent)).subscribe((student) => {
      console.log(student);
      if (student && this.StudentForm) {
        this.StudentForm.controls.id.setValue(student.id);
        this.StudentForm.controls.Name.setValue(student.Name);
        this.StudentForm.controls.Neptun.setValue(student.Neptun);
        this.StudentForm.controls.Email.setValue(student.Email);
        this.StudentForm.controls.Field_of_study.setValue(
          student.Field_of_study
        );
        this.StudentForm.controls.subjectids.setValue(student.subjectids);
      }
    });

    this.StudentForm = this.formBuilder.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
      Name: ['', [Validators.required, Validators.maxLength(50)]],
      Neptun: [
        '',
        [
          regExValidator(/^[A-Za-z][A-Za-z0-9]{5}$/),
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
        ],
      ],
      Email: ['', [Validators.required, Validators.maxLength(100)]],
      Field_of_study: ['', [Validators.required]],
      subjectids: ['', [Validators.required]],
      subjects: [],
    });
  }

  onSubmit(studentData: any) {
    this.subject$.subscribe((subject) => {
      this.subjectlist = subject as SubjectModel[];
    });

    console.log('list: ', this.subjectlist);

    studentData.deleted = false;
    studentData.subjects = [];
    studentData.subjectids = studentData.subjectids.split(',');

    studentData.subjectids.forEach((x) => {
      const subject = this.subjectlist.find((y) => y.id == x);

      console.log('subject', subject.Name);

      if (subject != undefined) studentData.subjects.push(subject);
    });

    this.store.dispatch(studentUpdateAction(studentData));

    this.StudentForm.reset();
    this.router.navigate(['/student']);
  }

  get name() {
    return this.StudentForm.get('Name');
  }
  get neptun() {
    return this.StudentForm.get('Neptun');
  }
  get email() {
    return this.StudentForm.get('Email');
  }
  get Field_of_study() {
    return this.StudentForm.get('Field_of_study');
  }
  get subjectids() {
    return [this.StudentForm.get('subjectids')];
  }
}
