import { Subject, SubjectTable } from './Subject.data';
import { User, Roles } from './User';

export enum Teacher_Jobs {
  docens = 'docens',
  adjunktus = 'adjunktus',
  ügyvivő_szakértő = 'ügyvivő_szakértő',
  tanársegéd = 'tanársegéd',
  egyéb = 'egyéb',
}

export interface Teacher {
  //extends User
  id: number;
  Neptun: string;
  Name: string;
  Email: string;
  Job: Teacher_Jobs;
  subjects: Subject[];
  subjectids: number[];
  deleted: boolean;
}

export class TeacherTable {
  public static _teachers: Teacher[] = [
    {
      id: 1,
      Neptun: '123ABC',
      Name: '1Name',
      Email: '1Name@email.com',
      Job: Teacher_Jobs.egyéb,
      subjectids: [1],
      subjects: [],
      deleted: false,
      /*
      department: 'Valami',
      birth_year: new Date(2021, 9, 1),
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODQ1ODA3NzcsImV4cCI6MTcxNjExNjc3NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiMU5hbWVAZW1haWwuY29tIiwiR2l2ZW5OYW1lIjoiMU5hbWUiLCJTdXJuYW1lIjoiMU5hbWUiLCJFbWFpbCI6IjFOYW1lQGVtYWlsLmNvbSIsIlJvbGUiOlsiQWRtaW4iLCJUZWFjaGVyIl0sIklkIjoiMSJ9.keigstAfsiulDYf8PqlLFwOKZWPYNdR_nMWIdpOn01w',
      role: [Roles.Admin, Roles.Teacher],
      */
    },
    {
      id: 2,
      Neptun: '321ABC',
      Name: '2Name',
      Email: '2Name@email.com',
      Job: Teacher_Jobs.egyéb,
      subjectids: [2],
      subjects: [],
      deleted: false,
      /*
      department: 'Valami',
      birth_year: new Date(2021, 9, 1),
      token: '',
      role: [],
       */
    },
  ];

  public static teachers: Teacher[] = TeacherTable._teachers.map((teacher) => {
    teacher.subjectids.forEach((x) => {
      if (SubjectTable != undefined) {
        const subject = SubjectTable._subject.find((a) => a.id === x);
        if (subject != undefined) teacher.subjects.push(subject);
      }
    });
    return teacher;
  });
}
