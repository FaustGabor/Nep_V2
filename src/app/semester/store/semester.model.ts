import { Subject } from '../../data/Subject.data';
import { Semester } from '../../data/semester.data';

export class SemesterModel implements Semester {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  deleted: boolean;
}
