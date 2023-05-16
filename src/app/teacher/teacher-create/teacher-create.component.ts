import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextTeacherId } from '../store/teacher.selectors';
import {
  TeacherActionTypes,
  teachersLoadedAction,
  teacherCreateAction,
} from '../store/teacher.actions';
import { Teacher, Teacher_Jobs } from '../../data/Teacher.data';
import { TeacherService } from '../teacher.service';
import { TeacherModel } from '../store/teacher.model';
import { SubjectTable } from '../../data/Subject.data';
import { SubjectModel } from '../../subject/store/subject.model';
import { selectSubjects } from '../../subject/store/subject.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subject/store/subject.actions';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css'],
})
export class TeacherCreateComponent implements OnInit {
  TeacherForm: FormGroup;
  teacher: Teacher;
  enums: string[] = Object.values(Teacher_Jobs).filter((v) => isNaN(Number(v)));
  //subject: SubjectModel[] = this.store.pipe(select(selectSubjects));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private service: TeacherService
  ) {}

  ngOnInit() {
    this.store.dispatch(subjectsRequestedAction());

    this.TeacherForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.maxLength(50)]],
      Neptun: [
        '',
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)],
      ],
      Email: ['', [Validators.required, Validators.maxLength(100)]],
      Job: ['', [Validators.required]],
      subjectids: ['', [Validators.required]],
      subjects: [],
    });
  }

  onSubmit(teacherData: any) {
    teacherData.deleted = false;
    teacherData.subjects = [];
    teacherData.subjectids = teacherData.subjectids.split(',');

    teacherData.subjectids.forEach((x) => {
      if (SubjectTable != undefined) {
        const subject = SubjectTable.subjects.find((a) => a.id === x);

        console.log('subjectTable', subject);
        console.log('subject', SubjectTable);
        console.log('x', x);

        if (subject != undefined) teacherData.subjects.push(subject);
      }
    });

    this.store.dispatch(teacherCreateAction(teacherData));

    this.TeacherForm.reset();
    this.router.navigate(['/teacher']);
  }

  get name() {
    return this.TeacherForm.get('Name');
  }
  get neptun() {
    return this.TeacherForm.get('Neptun');
  }
  get email() {
    return this.TeacherForm.get('Email');
  }
  get job() {
    return this.TeacherForm.get('Job');
  }
  get subjectids() {
    return [this.TeacherForm.get('subjectids')];
  }

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

  getJobErrorMessage() {
    if (this.job.dirty || this.job.touched) {
      if (this.job.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }
}
