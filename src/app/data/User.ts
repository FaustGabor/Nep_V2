export enum Roles {
  Student = 'Student',
  Teacher = 'Teacher',
  Admin = 'Admin',
}

export interface User {
  department: string;
  birth_year: Date;
  token: string;
  role: Roles[];
}
