import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextStudentId } from '../store/student.selectors';
import {
  StudentActionTypes,
  studentsLoadedAction,
  studentCreateAction,
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

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
})
export class StudentCreateComponent implements OnInit {
  StudentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private service: StudentService,
    private service_sub: SubjectService
  ) {}

  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());

    this.StudentForm = this.formBuilder.group({
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
    studentData.deleted = false;
    studentData.subjects = [];
    studentData.subjectids = studentData.subjectids.split(',');
    studentData.department = 'ismeretlen';

    studentData.subjectids.forEach((x) => {
      const subject = this.service_sub.getSubject(x);

      if (subject != undefined) studentData.subjects.push(subject);
    });

    this.store.dispatch(studentCreateAction(studentData));

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
  get field_of_study() {
    return this.StudentForm.get('Field_of_study');
  }
  get subjectids() {
    return [this.StudentForm.get('subjectids')];
  }

  /*
  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('required')) return 'You must enter a value!';
      if (this.name.hasError('maxlength'))
        return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getNeptunErrorMessage() {
    if (this.neptun.dirty || this.neptun.touched) {
      if (this.neptun.hasError('required')) return 'You must enter a value!';
      if (this.neptun.hasError('maxlength'))
        return 'You can enter at most 6 characters!';
    }
    return '';
  }

  getEmailErrorMessage() {
    if (this.email.dirty || this.email.touched) {
      if (this.email.hasError('required')) return 'You must enter a value!';
      if (this.email.hasError('maxlength'))
        return 'You can enter at most 100 characters!';
    }
    return '';
  }

  getField_of_studyErrorMessage() {
    if (this.field_of_study.dirty || this.field_of_study.touched) {
      if (this.field_of_study.hasError('required'))
        return 'You must enter a value!';
    }
    return '';
  }
  */
}
