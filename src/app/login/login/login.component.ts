import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Semester } from '../../data/Semester.data';
import { regExValidator } from '../../validators/regex.validator';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;

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
  }

  onSubmit(semesterData: any) {
    semesterData.deleted = false;

    this.service.Login(semesterData.name);

    this.LoginForm.reset();
    this.router.navigate(['/']);
  }

  get name() {
    return this.LoginForm.get('name');
  }
}
