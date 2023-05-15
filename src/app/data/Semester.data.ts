import { Subject, SubjectTable } from './Subject.data';

export interface Semester {
  id: number;
  Name: string;
  Start_date: Date;
  End_date: Date;
  deleted: boolean;
}

export class SemesterTable {
  public static _semesters: Semester[] = [
    {
      id: 1,
      Name: '2022/23/1',
      Start_date: new Date(2022, 9, 1),
      End_date: new Date(2023, 7, 1),
      deleted: false,
    },
    {
      id: 2,
      Name: '2021/22/1',
      Start_date: new Date(2021, 9, 1),
      End_date: new Date(2022, 7, 1),
      deleted: false,
    },
  ];

  
}
