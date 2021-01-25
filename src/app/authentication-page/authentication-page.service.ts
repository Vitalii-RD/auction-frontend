
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

class LoginDTORequest {
  email:String;
  password:String;
  constructor(email:String, password:String) {
    this.email = email;
    this.password = password;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  
  private authenticationUrl = environment.url;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
    withCredentials: true
  };

  constructor(private http: HttpClient) {}

  login(form:any):Observable<{}> {
    let data = new LoginDTORequest(form.name, form.password);
    const url = `${this.authenticationUrl}/login`; 
    return this.http.post(url, data, this.httpOptions);
  }
}