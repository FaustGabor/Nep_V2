import { Student, Student_Fields } from 'src/app/data/Student.data';
import { User, Roles } from '../../data/User';
import { Subject } from '../../data/Subject.data';

export class StudentModel implements Student {
  //, User
  id: number;
  Neptun: string;
  Name: string;
  Email: string;
  Field_of_study: Student_Fields;
  subjectids: number[];
  subjects: Subject[];
  deleted: boolean;
  /*
  department: string;
  birth_year: Date;
  token: string;
  role: Roles[];
  */
}
