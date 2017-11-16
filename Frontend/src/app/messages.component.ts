import { Component } from '@angular/core';
import { ApiService } from './api.service'

@Component({
  selector: 'messages',
  template: `<button mat-button>Click me!</button>
             <div *ngFor="let message of apiService.messages">
                <mat-card>{{message.message}}</mat-card>  
             </div>`
})
export class MessagesComponent {
  title = 'my app';  

  constructor(private apiService: ApiService) {}

  ngOnInit(){
      this.apiService.getMessages();
  }
}


