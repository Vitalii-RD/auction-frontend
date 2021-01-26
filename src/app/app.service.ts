import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable  } from 'rxjs';
import User from 'src/types/User';

@Injectable({ providedIn: 'root' })
export class UserService {
  private emitChangeSource = new BehaviorSubject<User>(new User(-1, "", ""));
  userObservable = this.emitChangeSource.asObservable();
 
  getValue():User {
    return this.emitChangeSource.value;
  }

  emitUser(user: User) {
    this.emitChangeSource.next(user);
  }
}