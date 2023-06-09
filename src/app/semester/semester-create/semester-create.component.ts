import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextSemesterId } from '../store/semester.selectors';
import {
  SemesterActionTypes,
  semestersLoadedAction,
  semesterCreateAction,
} from '../store/semester.actions';
import { Semester } from '../../data/Semester.data';
import { SemesterService } from '../semester.service';
import { SemesterModel } from '../store/semester.model';
import { regExValidator } from '../../validators/regex.validator';

@Component({
  selector: 'app-semester-create',
  templateUrl: './semester-create.component.html',
  styleUrls: ['./semester-create.component.css'],
})
export class SemesterCreateComponent implements OnInit {
  SemesterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private service: SemesterService
  ) {}

  ngOnInit() {
    this.SemesterForm = this.formBuilder.group({
      name: [
        '',
        [
          regExValidator(/^\d{4}\/\d{2}\/\d{1}$/),
          Validators.required,
          Validators.maxLength(50),
        ],
      ],
      start_date: [2000, [Validators.required]],
      end_date: [2000, [Validators.required]],
    });
  }

  onSubmit(semesterData: any) {
    semesterData.deleted = false;
    this.store.dispatch(semesterCreateAction(semesterData));
    this.SemesterForm.reset();
    this.router.navigate(['/semester']);
  }

  get name() {
    return this.SemesterForm.get('name');
  }
  get start_date() {
    return this.SemesterForm.get('start_date');
  }
  get end_date() {
    return this.SemesterForm.get('end_date');
  }

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('minLength'))
        return 'You have to enter 9 characters!';
      if (this.name.hasError('maxLength'))
        return 'You have to enter 9 characters!';
    }
    return '';
  }

  getDescriptionErrorMessage() {
    if (this.start_date.dirty || this.start_date.touched) {
      if (this.start_date.hasError('required'))
        return 'You must enter a value!';
      if (this.start_date.hasError('maxlength'))
        return 'You can enter at most 100 characters!';
    }
    return '';
  }
}
