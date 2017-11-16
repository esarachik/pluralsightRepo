import { Component } from '@angular/core';
import { AuthService } from './auth.service'



@Component({
  selector: 'register',
  template: `
  <mat-card>
    <mat-card-header>  
      <mat-card-title>
        <h4>Register a new User</h4>
      </mat-card-title>
    </mat-card-header>
    <form>
      <mat-input-container>
        <input [(ngModel)]="registerData.email" name="email" matInput placeholder="email" type="email">
      </mat-input-container>
      <mat-input-container>
        <input [(ngModel)]="registerData.pwd" name="password" matInput placeholder="password" type="password">
      </mat-input-container>
      <button (click)="post()" mat-raised-button color="primary">Register</button>
    </form>
  </mat-card>`
})
export class RegisterComponent { 
  registerData = {}
  constructor(private authService: AuthService) {}

  post(){
    console.log(this.registerData)
    this.authService.registerUser(this.registerData)
  }

}


