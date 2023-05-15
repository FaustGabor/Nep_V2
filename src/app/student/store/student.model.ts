import { Subject } from '../../data/Subject.data';
import { Student } from '../../data/student.data';

export class studentModel implements student {
  id: number;
  Neptun: string;
  Name: string;
  Email: string;
  Field_of_study: Student_Fields;
  subjectids: number[];
  subjects: Subject[];
  deleted: boolean;
}
