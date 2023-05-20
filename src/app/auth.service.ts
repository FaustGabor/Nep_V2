import { Injectable } from '@angular/core';
import { User } from './data/User';

@Injectable()
export class AuthService {
  constructor() {
    this.user = null;
  }

  user: User;

  getToken(): string {
    if (this.user == null) return '';
    else return this.user.token;
  }

  setToken(user_: User) {
    console.log(user_);
    this.user = user_;
  }

  isAuthenticated(): boolean {
    return true;
    //return this.user != null;
  }
}
