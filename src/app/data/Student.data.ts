import { Subject, SubjectTable } from './Subject.data';
import { User, Roles } from './User';

export enum Student_Fields {
  Mérnökinformatikus_Msc = 'Mérnökinformatikus_Msc',
  Programtervező_informatikus_Msc = 'Programtervező_informatikus_Msc',
  Mérnökinformatikus_Bsc = 'Mérnökinformatikus_Bsc',
  Programtervező_informatikus_Bsc = 'Programtervező_informatikus_Bsc',
  Gazdaságinformatikus_Bsc = 'Gazdaságinformatikus_Bsc',
}

export interface Student {
  // extends User
  id: number;
  Neptun: string;
  Name: string;
  Email: string;
  Field_of_study: Student_Fields;
  subjectids: number[];
  subjects: Subject[];
  deleted: boolean;
}

export class StudentTable {
  public static _student: Student[] = [
    {
      id: 1,
      Neptun: 'ABC123',
      Name: 'Name1',
      Email: 'Name1@email.com',
      Field_of_study: Student_Fields.Programtervező_informatikus_Bsc,
      subjectids: [1],
      subjects: [],
      deleted: false,
      /*
      department: 'ismeretlen',
      birth_year: new Date(2021, 9, 1),
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODQ1ODA3NzcsImV4cCI6MTcxNjExNjc3NywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiMU5hbWVAZW1haWwuY29tIiwiR2l2ZW5OYW1lIjoiTmFtZTEiLCJTdXJuYW1lIjoiTmFtZTEiLCJFbWFpbCI6Ik5hbWUxQGVtYWlsLmNvbSIsIlJvbGUiOiJTdHVkZW50IiwiSWQiOiIxIn0.Xx551NvnZP9V797IAy4Vw4pPuX2wEGCRyUC7ZWWz8g0',
      role: [Roles.Student],
      */
    },
    {
      id: 2,
      Neptun: 'ABC321',
      Name: 'Name2',
      Email: 'Name2@email.com',
      Field_of_study: Student_Fields.Programtervező_informatikus_Msc,
      subjectids: [2],
      subjects: [],
      deleted: false,
      /*
      department: 'ismeretlen',
      birth_year: new Date(2021, 9, 1),
      token: '',
      role: [],
      */
    },
  ];

  public static students: Student[] = StudentTable._student.map((student) => {
    student.subjectids.forEach((x) => {
      if (SubjectTable != undefined) {
        const subject = SubjectTable._subject.find((a) => a.id === x);
        if (subject != undefined) student.subjects.push(subject);
      }
    });
    return student;
  });
}
