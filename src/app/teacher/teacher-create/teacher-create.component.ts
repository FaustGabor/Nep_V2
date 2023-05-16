import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectNextTeacherId } from '../store/teacher.selectors';
import { TeacherActionTypes, teachersLoadedAction, teacherCreateAction } from '../store/teacher.actions';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {

  TeacherForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store) { }

  ngOnInit() {
    this.TeacherForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(50)]],
      'birthYear': [1980, [Validators.required]],
      'nationality': ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  onSubmit(authorData: any) {
    authorData.deleted = false;
    this.store.dispatch(authorCreateAction(authorData));
    this.TeacherForm.reset();
    this.router.navigate(['/authors']);
  }

  get name() { return this.TeacherForm.get('name'); }
  get birthYear() { return this.TeacherForm.get('birthYear'); }
  get nationality() { return this.TeacherForm.get('nationality'); }

  getNameErrorMessage() {
    if (this.name.dirty || this.name.touched) {
      if (this.name.hasError('required')) return 'You must enter a value!';
      if (this.name.hasError('maxlength')) return 'You can enter at most 50 characters!';
    }
    return '';
  }

  getDescriptionErrorMessage() {
    if (this.birthYear.dirty || this.birthYear.touched) {
      if (this.birthYear.hasError('required')) return 'You must enter a value!';
      if (this.birthYear.hasError('maxlength')) return 'You can enter at most 100 characters!';
    }
    return '';
  }

  getStartErrorMessage() {
    if (this.nationality.dirty || this.nationality.touched) {
      if (this.nationality.hasError('required')) return 'You must enter a value!';
      if (this.nationality.hasError('regEx')) return 'You must enter a valid date time!';
    }
    return '';
  }
}