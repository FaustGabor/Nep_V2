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

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css'],
})
export class TeacherCreateComponent implements OnInit {
  TeacherForm: FormGroup;
  teacher: Teacher;
  enums: string[] = Object.values(Teacher_Jobs).filter((v) => isNaN(Number(v)));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private service: TeacherService
  ) {}

  ngOnInit() {
    this.TeacherForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      neptun: [
        '',
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)],
      ],
      email: ['', [Validators.required, Validators.maxLength(100)]],
      job: ['', [Validators.required]],
      ids: ['', [Validators.required]],
    });
  }

  onSubmit(teacherData: any) {
    /*

    this.teacher = new TeacherModel();
    this.teacher.Name = teacherData.name;
    this.service.createTeacher(this.teacher);
    
    */
    teacherData.deleted = false;
    teacherData.ids = [];
    this.store.dispatch(teacherCreateAction(teacherData));

    this.TeacherForm.reset();
    this.router.navigate(['/teacher']);
  }

  get name() {
    return this.TeacherForm.get('name');
  }
  get neptun() {
    return this.TeacherForm.get('neptun');
  }
  get email() {
    return this.TeacherForm.get('email');
  }
  get job() {
    return this.TeacherForm.get('job');
  }
  get ids() {
    return [this.TeacherForm.get('ids')];
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

  getIdsErrorMessage() {
    if (this.ids.dirty || this.ids.touched) {
      if (this.ids.hasError('required')) return 'You must enter a value!';
    }
    return '';
  }
}
