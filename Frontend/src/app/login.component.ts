import { Component } from '@angular/core';
import { AuthService } from './auth.service'


@Component({
  selector: 'login',
  template: `
  <mat-card>
    <mat-card-header>  
      <mat-card-title>
        <h4>Login a new User</h4>
      </mat-card-title>
    </mat-card-header>
    <form>
      <mat-input-container>
        <input [(ngModel)]="loginData.email" name="email" matInput placeholder="email" type="email">
      </mat-input-container>
      <mat-input-container>
        <input [(ngModel)]="loginData.pwd" name="password" matInput placeholder="password" type="password">
      </mat-input-container>
      <button (click)="post()" mat-raised-button color="primary">Login</button>
    </form>
  </mat-card>`
})
export class LoginComponent { 
  loginData = {}
  constructor(private authService: AuthService) {}

  post(){
    console.log(this.loginData)
    this.authService.loginUser(this.loginData)
  }

}


