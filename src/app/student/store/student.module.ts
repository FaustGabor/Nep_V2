import { Subject, Subject_Department } from '../../data/Subject.data';

export class SubjectModel implements Subject {
  id: number;
  Name: string;
  Code: string;
  Credit: number;
  Department: Subject_Department;
  deleted: boolean;
}
