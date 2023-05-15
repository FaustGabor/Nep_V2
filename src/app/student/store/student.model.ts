import { Subject } from '../../data/Subject.data';
import { Student, Student_Fields } from '../../data/Student.data';

export class StudentModel implements Student {
  id: number;
  Neptun: string;
  Name: string;
  Email: string;
  Field_of_study: Student_Fields;
  subjectids: number[];
  subjects: Subject[];
  deleted: boolean;
}
