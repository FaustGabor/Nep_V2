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
  selectNextTeacherId,
  selectLoadedTeacher,
} from '../store/teacher.selectors';
import {
  TeacherActionTypes,
  teachersLoadedAction,
  teacherCreateAction,
  teacherRequestedAction,
} from '../store/teacher.actions';
import { Teacher, Teacher_Jobs } from '../../data/Teacher.data';
import { TeacherService } from '../teacher.service';
import { TeacherModel } from '../store/teacher.model';
import { SubjectTable } from '../../data/Subject.data';
import { SubjectModel } from '../../subject/store/subject.model';
import { selectSubjects } from '../../subject/store/subject.selectors';
import { Observable } from 'rxjs';
import { subjectsRequestedAction } from '../../subject/store/subject.actions';
import { SubjectService } from '../../subject/subject.service';
import { regExValidator } from '../../validators/regex.validator';
import { map } from 'rxjs';

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.css'],
})
export class TeacherUpdateComponent implements OnInit {
  TeacherForm: FormGroup;
  subjectlist: SubjectModel[];

  subject$: Observable<SubjectModel[]> = this.store.pipe(
    select(selectSubjects)
  );

  enums: string[] = Object.values(Teacher_Jobs).filter((v) => isNaN(Number(v)));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private service: TeacherService,
    private service_sub: SubjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            teacherRequestedAction({ teacherId: +params.get('teacherId') })
          );
        })
      )
      .subscribe();

    this.store.pipe(select(selectLoadedTeacher)).subscribe((teacher) => {
      console.log(teacher);
      if (teacher && this.TeacherForm) {
        this.TeacherForm.controls.id.setValue(teacher.id);
        this.TeacherForm.controls.Name.setValue(teacher.Name);
        this.TeacherForm.controls.Neptun.setValue(teacher.Neptun);
        this.TeacherForm.controls.Email.setValue(teacher.Email);
        this.TeacherForm.controls.Job.setValue(teacher.Job);
        this.TeacherForm.controls.subjectids.setValue(teacher.subjectids);
      }
    });

    this.TeacherForm = this.formBuilder.group({
      id: [{ value: 0, disabled: true }, [Validators.required]],
      Name: ['', [Validators.required, Validators.maxLength(50)]],
      Neptun: [
        '',
        //regExValidator(/^[A-Za-z][A-Za-z0-9]{5}$/),
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)],
      ],
      Email: ['', [Validators.required, Validators.maxLength(100)]],
      Job: ['', [Validators.required]],
      subjectids: ['', [Validators.required]],
      subjects: [],
    });
  }

  onSubmit(teacherData: any) {
    this.subject$.subscribe((subject) => {
      this.subjectlist = subject as SubjectModel[];
    });

    console.log('list: ', this.subjectlist);

    teacherData.deleted = false;
    teacherData.subjects = [];
    teacherData.subjectids = teacherData.subjectids.split(',');

    teacherData.subjectids.forEach((x) => {
      const subject = this.subjectlist.find((y) => y.id == x);

      console.log('subject', subject.Name);

      if (subject != undefined) teacherData.subjects.push(subject);
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
}
