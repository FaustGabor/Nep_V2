import { Sujbect, SujbectTable } from './Subject.data';

export enum Student_Fields {
  Mérnökinformatikus_Msc = 'Mérnökinformatikus_Msc',
  Programtervező_informatikus_Msc = 'Programtervező_informatikus_Msc',
  Mérnökinformatikus_Bsc = 'Mérnökinformatikus_Bsc',
  Programtervező_informatikus_Bsc = 'Programtervező_informatikus_Bsc',
  Gazdaságinformatikus_Bsc = 'Gazdaságinformatikus_Bsc',
}

export interface Student {
  id: number;
  Neptun: string;
  Name: string;
  Email: string;
  Field_of_study: Student_Fields;
  subjectids: number[];
  subject_list: Sujbect[];
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
      subject_list: [],
      deleted: false,
    },
    {
      id: 2,
      Neptun: 'ABC321',
      Name: 'Name2',
      Email: 'Name2@email.com',
      Field_of_study: Student_Fields.Programtervező_informatikus_Msc,
      subjectids: [2],
      subject_list: [],
      deleted: false,
    },
  ];

  public static students: Student[] = StudentTable._student.map((student) => {
    student.subjectids.forEach((x) => {
      const subject = SujbectTable.subjects.find(
        (a) => a.id === student.subjectids[x]
      );
      if (subject != undefined) student.subject_list.push(subject);
    });
    return student;
  });
}
