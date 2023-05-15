import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EventTable } from './event-list/events';
import { BookTable } from './data/books.data';
import { AuthorTable } from './data/authors.data';
import { SemesterTable } from './data/Semester.data';

import { StudentTable } from './data/Student.data';
import { TeacherTable } from './data/Teacher.data';
import { SubjectTable } from './data/Subject.data';

@Injectable()
export class InMemoryEventService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const db = {
      semester: SemesterTable.semesters,
      books: BookTable.books,
      authors: AuthorTable.authors,
      student: StudentTable.students,
      teacher: TeacherTable.teachers,
      subject: SubjectTable._subject,
    };
    return db;
  }
}
