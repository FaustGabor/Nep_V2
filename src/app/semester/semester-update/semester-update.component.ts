import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  selectNextSemesterId,
  selectSemester,
} from '../store/semester.selectors';
import {
  SemesterActionTypes,
  semestersLoadedAction,
  semesterUpdateAction,
  semesterRequestedAction,
} from '../store/semester.actions';
import { Semester } from '../../data/Semester.data';
import { SemesterService } from '../semester.service';
import { SemesterModel } from '../store/semester.model';
import { regExValidator } from '../../validators/regex.validator';
import { map } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-semester-update',
  templateUrl: './semester-update.component.html',
  styleUrls: ['./semester-update.component.css'],
})
export class SemesterUpdateComponent implements OnInit {
  SemesterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private service: SemesterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            semesterRequestedAction({ semesterId: +params.get('semesterId') })
          );
        })
      )
      .subscribe();

    this.store.pipe(select(selectSemester)).subscribe((semester) => {
      console.log(semester);
      if (semester && this.SemesterForm) {
        this.SemesterForm.controls.id.setValue(semester.id);
        this.SemesterForm.controls.name.setValue(semester.name);
        this.SemesterForm.controls.start_date.setValue(
          formatDate(semester.start_date, 'yyyy-MM-dd', 'en')
        );
        this.SemesterForm.controls.end_date.setValue(
          formatDate(semester.end_date, 'yyyy-MM-dd', 'en')
        );
      }
    });

    this.SemesterForm = this.formBuilder.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
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
    this.store.dispatch(semesterUpdateAction(semesterData));
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
