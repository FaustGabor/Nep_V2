import { Subject } from '../../data/Subject.data';
import { Teacher, Teacher_Jobs } from '../../data/Teacher.data';
import { User, Roles } from '../../data/User';

export class TeacherModel implements Teacher,User {
  id: number;
  Neptun: string;
  Name: string;
  Email: string;
  Job: Teacher_Jobs;
  subjects: Subject[];
  subjectids: number[];
  deleted: boolean;
  department: string;
  birth_year: Date;
  token: string;
  role: Roles[];
}
