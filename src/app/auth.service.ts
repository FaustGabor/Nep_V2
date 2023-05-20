import { Injectable } from '@angular/core';
import { User } from './data/User';

@Injectable()
export class AuthService {
  constructor() {
    this.user = null;
  }

  user: User;

  getToken(): string {
    return this.user.token;
  }

  setToken(user_: User) {
    console.log(user_);
    this.user = user_;
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }
}
