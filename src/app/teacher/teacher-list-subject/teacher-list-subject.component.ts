import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Observable } from 'rxjs';
import { Teacher } from '../../data/Teacher.data';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { TeacherModel } from '../store/teacher.model';
import { selectLoadedTeacher } from '../store/teacher.selectors';
import { teacherRequestedAction } from '../store/teacher.actions';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectModel } from '../../subject/store/subject.model';

@Component({
  selector: 'app-teacher-list-subject',
  templateUrl: './teacher-list-subject.component.html',
  styleUrls: ['./teacher-list-subject.component.css'],
})
export class TeacherListSubjectComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Name', 'Code', 'Credit', 'Department'];

  semesterid_from_pararm: string;
  subjects: SubjectModel[];

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

    this.route.paramMap
      .pipe(
        map((params) => {
          return (this.semesterid_from_pararm = params.get('semesterId'));
        })
      )
      .subscribe();

    this.subjects = [];
    this.store.pipe(select(selectLoadedTeacher)).subscribe((teacher) => {
      if (teacher.subjects != null || teacher.subjects != undefined) {
        teacher.subjects.forEach((x) => {
          x.semesterids.forEach((y) => {
            console.log('x', x);
            console.log('y', y);
            console.log('semesterid', this.semesterid_from_pararm);
            if (y == Number(this.semesterid_from_pararm)) {
              this.subjects.push(x);
              console.log('pushed');
            }
          });
        });
      }
    });
  }

  constructor(
    private TeacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}
}
