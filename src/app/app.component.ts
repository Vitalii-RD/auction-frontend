import { Component } from '@angular/core';
import User from 'src/types/User';
import { UserService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser:User;

  constructor(private userService: UserService) {
    this.currentUser =this.userService.getValue();  
    this.userService.userObservable.subscribe((user:User) => {
      this.currentUser = user;
    })
  }
}
