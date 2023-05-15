import { Subject } from '../../data/Subject.data';
import { Semester } from '../../data/semester.data';

export class SemesterModel implements Semester {
  id: number;
  Name: string;
  Start_date: Date;
  End_date: Date;
  deleted: boolean;
}
