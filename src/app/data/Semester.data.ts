import { Sujbect, SujbectTable } from './Subject.data';

export interface Semester {
  id: number;
  Name: string;
  Start_date: Date;
  End_date: Date;
  subjectids: number[];
  subjects: Sujbect[];
  deleted: boolean;
}

export class SemesterTable {
  public static _semesters: Semester[] = [
    {
      id: 1,
      Name: '2022/23/1',
      Start_date: new Date(2022, 9, 1),
      End_date: new Date(2023, 7, 1),
      subjectids: [1, 2],
      subjects: [],
      deleted: false,
    },
    {
      id: 2,
      Name: '2021/22/1',
      Start_date: new Date(2021, 9, 1),
      End_date: new Date(2022, 7, 1),
      subjectids: [],
      subjects: [],
      deleted: false,
    },
  ];

  public static semesters: Semester[] = SemesterTable._semesters.map(
    (semester) => {
      semester.subjectids.forEach((x) => {
        const subject = SujbectTable.subjects.find(
          (a) => a.id === semester.subjectids[x]
        );
        if (subject != undefined) semester.subjects.push(subject);
      });
      return semester;
    }
  );
}
