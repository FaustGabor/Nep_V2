import { Student, StudentTable } from './Student.data';
import { Teacher, TeacherTable } from './Teacher.data';
import { Semester, SemesterTable } from './Semester.data';

export enum Subject_Department {
  VIRT = 'VIRT',
  RSZT = 'RSZT',
  Matematika = 'Matematika',
  egyéb = 'egyéb',
}

export interface Subject {
  id: number;
  Name: string;
  Code: string;
  Credit: number;
  Department: Subject_Department;
  semesterids: number[];
  semesters: Semester[];
  deleted: boolean;
}

export class SubjectTable {
  public static _subject: Subject[] = [
    {
      id: 1,
      Name: 'Prog1',
      Code: 'code1',
      Credit: 5,
      Department: Subject_Department.egyéb,
      semesterids: [1, 2],
      semesters: [],
      deleted: false,
    },
    {
      id: 2,
      Name: 'Prog2',
      Code: 'code2',
      Credit: 5,
      Department: Subject_Department.egyéb,
      semesterids: [2],
      semesters: [],
      deleted: false,
    },
  ];

  public static subjects: Subject[] = SubjectTable._subject.map((subject) => {
    subject.semesterids.forEach((x) => {
      if (SemesterTable != undefined) {
        const semester = SemesterTable._semesters.find((a) => a.id === x);
        if (semester != undefined) subject.semesters.push(semester);
      }
    });
    return subject;
  });
}
