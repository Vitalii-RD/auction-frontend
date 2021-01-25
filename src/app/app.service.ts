import { Injectable } from '@angular/core';
import { Subject, Observable  } from 'rxjs';
import User from 'src/types/User';

@Injectable({ providedIn: 'root' })
export class UserService {
  private emitChangeSource = new Subject<User>();
  
  getUser():Observable<User> {
    return this.emitChangeSource.asObservable();
  }

  emitUser(user: User) {
    this.emitChangeSource.next(user);
  }
}