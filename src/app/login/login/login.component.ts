import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { studentsRequestedAction } from '../../student/store/student.actions';
import { teachersRequestedAction } from '../../teacher/store/teacher.actions';
import { User } from '../../data/User';
import { regExValidator } from '../../validators/regex.validator';
import { LoginService } from '../login.service';
import { Observable } from 'rxjs';
import { TeacherModel } from '../../teacher/store/teacher.model';
import { StudentModel } from '../../student/store/student.model';
import { selectStudents } from '../../student/store/student.selectors';
import { selectTeachers } from '../../teacher/store/teacher.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  studentlist: User[];
  teacherlist: User[];
  login_user: User;

  teacher$: Observable<TeacherModel[]> = this.store.pipe(
    select(selectTeachers)
  );

  student$: Observable<StudentModel[]> = this.store.pipe(
    select(selectStudents)
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private service: LoginService
  ) {}

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
    });

    this.store.dispatch(studentsRequestedAction());
    this.store.dispatch(teachersRequestedAction());
  }

  onSubmit(LoginData: any) {
    this.login_user = null;

    this.student$.subscribe((student) => {
      this.studentlist = student as User[];
    });
    this.teacher$.subscribe((teacher) => {
      this.teacherlist = teacher as User[];
    });

    this.login_user = this.studentlist.find(
      (x) => (x.department = LoginData.Name)
    );
    if (this.login_user == null)
      this.login_user = this.teacherlist.find(
        (x) => (x.department = LoginData.Name)
      );

    if (this.login_user != null) {
      this.service.Login(this.login_user);
    } else {
      LoginData.Name = 'No such user';
    }
    this.LoginForm.reset();
    this.router.navigate(['/']);
  }

  get name() {
    return this.LoginForm.get('name');
  }
}
