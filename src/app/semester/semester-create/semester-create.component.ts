import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
//import { authorsRequestedAction } from '../../authors/store/authors.actions';
//import { AuthorModel } from '../../authors/store/authors.model';
//import { selectAuthors } from '../../authors/store/authors.selectors';
import { semesterCreateAction } from '../store/semester.actions';

@Component({
  selector: 'app-semester-create',
  templateUrl: './semester-create.component.html',
  styleUrls: ['./semester-create.component.css'],
})
export class SemesterCreateComponent implements OnInit {
  semestersForm: FormGroup;
  //authors$: Observable<AuthorModel[]> = this.store.pipe(select(selectAuthors));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    /*
    this.store.dispatch(authorsRequestedAction());
    this.semestersForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
    });
    //this.authors$.subscribe(a => console.log('AUTHORS', a));
    */
  }

  onSubmit(semesterData: any) {
    semesterData.deleted = false;
    this.store.dispatch(semesterCreateAction(semesterData));
    this.semestersForm.reset();
    this.router.navigate(['/semesters']);
  }
}
