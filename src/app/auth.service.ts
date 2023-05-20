import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {
    this.usertoken = '';
  }

  usertoken: string;

  getToken(): string {
    return this.usertoken;
  }

  setToken(username: string) {
    console.log(name);
    username = '1';
    if (username == '1') this.usertoken = '1';
  }

  isAuthenticated(): boolean {
    return this.usertoken != '';
  }
}
