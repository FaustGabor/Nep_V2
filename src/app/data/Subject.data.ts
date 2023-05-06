import { Student, StudentTable } from './Student.data';
import { Teacher, TeacherTable } from './Teacher.data';
import { Semester, SemesterTable } from './Semester.data';

export enum Subject_Department {
  VIRT = 'VIRT',
  RSZT = 'RSZT',
  Matematika = 'Matematika',
  egyéb = 'egyéb',
}

export interface Sujbect {
  id: number;
  Name: string;
  Code: string;
  Credit: number;
  Department: Subject_Department;
  teacherids: number[];
  studentids: number[];
  teachers: Teacher[];
  students: Student[];
  semesterId: number;
  semester?: Semester;
  deleted: boolean;
}

export class SujbectTable {
  public static _subject: Sujbect[] = [
    {
      id: 1,
      Name: 'Prog1',
      Code: 'code1',
      Credit: 5,
      Department: Subject_Department.egyéb,
      teacherids: [1],
      studentids: [1],
      teachers: [],
      students: [],
      semesterId: 1,
      deleted: false,
    },
    {
      id: 2,
      Name: 'Prog2',
      Code: 'code2',
      Credit: 5,
      Department: Subject_Department.egyéb,
      teacherids: [1],
      studentids: [1],
      teachers: [],
      students: [],
      semesterId: 1,
      deleted: false,
    },
  ];

  public static subjects: Sujbect[] = SujbectTable._subject.map((subject) => {
    subject.teacherids.forEach((x) => {
      const teacher = TeacherTable.teachers.find(
        (a) => a.id === subject.teacherids[x]
      );
      if (teacher != undefined) subject.teachers.push(teacher);
    });

    subject.studentids.forEach((x) => {
      const student = StudentTable.students.find(
        (a) => a.id === subject.studentids[x]
      );
      if (student != undefined) subject.students.push(student);
    });

    const semester = SemesterTable.semesters.find(
      (a) => a.id === subject.semesterId
    );

    subject.semester = semester;
    return subject;
  });
}
