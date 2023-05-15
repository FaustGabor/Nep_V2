import { Subject } from '../../data/Subject.data';
import { Teacher, Teacher_Jobs } from '../../data/Teacher.data';

export class TeacherModel implements Teacher {
  id: number;
  Neptun: string;
  Name: string;
  Email: string;
  Job: Teacher_Jobs;
  subjects: Subject[];
  subjectids: number[];
  deleted: boolean;
}
