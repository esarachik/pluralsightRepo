import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'

import { MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register.component';
import { MessagesComponent } from './messages.component'
import { ApiService } from './api.service';

const routes = [
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  declarations: [
    AppComponent, MessagesComponent, RegisterComponent
  ],
  imports: [
    BrowserModule, 
    HttpModule, 
    RouterModule.forRoot(routes), 
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule, 
    MatCardModule, 
    MatToolbarModule, 
    MatInputModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
