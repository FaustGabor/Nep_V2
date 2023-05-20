import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { StudentModel } from '../store/student.model';
import { selectStudent } from '../store/student.selectors';
import { studentRequestedAction } from '../store/student.actions';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectModel } from '../../subject/store/subject.model';

@Component({
  selector: 'app-student-list-subject',
  templateUrl: './student-list-subject.component.html',
  styleUrls: ['./student-list-subject.component.css'],
})
export class StudentListSubjectComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Name', 'Code', 'Credit', 'Department'];

  semesterid_from_pararm: string;
  subjects: SubjectModel[];
  subject_o: Observable<SubjectModel[]>;

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => {
          return this.store.dispatch(
            studentRequestedAction({ studentId: +params.get('studentId') })
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
    this.store.pipe(select(selectStudent)).subscribe((teacher) => {
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
      this.subject_o = of(this.subjects);
    });
  }

  constructor(
    private TeacherService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}
}
