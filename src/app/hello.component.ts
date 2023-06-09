import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<mat-card>
    <h2>Hello {{name}}!</h2>
    <nav>
      <ul>
        <li><a mat-button routerLink="/semester">
            <b>Semesters</b>
          </a></li>
          <li><a mat-button routerLink="/subject">
            <b>Subjects</b>
          </a></li>
          <li><a mat-button routerLink="/teacher">
            <b>Teachers</b>
          </a></li>
          <li><a mat-button routerLink="/student">
            <b>Students</b>
          </a></li>
          <li><a mat-button routerLink="/login">
          <b>Login</b>
          </a></li>
      </ul>
    </nav>
  </mat-card>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {
  @Input() name: string;
}
