import { Sujbect, SujbectTable } from './Subject.data';

enum Teacher_Jobs {
  docens = 'docens',
  adjunktus = 'adjunktus',
  ügyvivő_szakértő = 'ügyvivő_szakértő',
  tanársegéd = 'tanársegéd',
  egyéb = 'egyéb',
}

export interface Teacher {
  id: number;
  Neptun: string;
  Name: string;
  Email: string;
  Job: Teacher_Jobs;
  subjects: Sujbect[];
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
    },
    {
      id: 1,
      Neptun: '321ABC',
      Name: '2Name',
      Email: '2Name@email.com',
      Job: Teacher_Jobs.egyéb,
      subjectids: [2],
      subjects: [],
      deleted: false,
    },
  ];

  public static teachers: Teacher[] = TeacherTable._teachers.map((teacher) => {
    teacher.subjectids.forEach((x) => {
      const subject = SujbectTable.subjects.find(
        (a) => a.id === teacher.subjectids[x]
      );
      if (subject != undefined) teacher.subjects.push(subject);
    });
    return teacher;
  });
}
