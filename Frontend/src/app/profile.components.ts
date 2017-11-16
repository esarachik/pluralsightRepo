import { Component } from '@angular/core';
import { ApiService } from './api.service'


@Component({
  selector: 'login',
  template: `
  <mat-card>
    <mat-card-header>  
      <mat-card-title>
        <h4>Login a new User</h4>
      </mat-card-title>
    </mat-card-header>
    
      
   
  </mat-card>`
})
export class ProfileComponent { 
  constructor(private apiService: ApiService) {}  
}


