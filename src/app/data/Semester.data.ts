import { Subject, SubjectTable } from './Subject.data';

export interface Semester {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  deleted: boolean;
}

export class SemesterTable {
  public static _semesters: Semester[] = [
    {
      id: 1,
      name: '2022/23/1',
      start_date: new Date(2022, 9, 1),
      end_date: new Date(2023, 7, 1),
      deleted: false,
    },
    {
      id: 2,
      name: '2021/22/1',
      start_date: new Date(2021, 9, 1),
      end_date: new Date(2022, 7, 1),
      deleted: false,
    },
  ];
}
