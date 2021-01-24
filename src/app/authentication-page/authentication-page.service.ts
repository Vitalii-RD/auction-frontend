
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import Auction from 'src/types/Auction';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  
  private authenticationUrl = environment.url;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
    withCredentials: true
  };

  constructor(private http: HttpClient) {}

  login():Observable<{}> {
    const url = `${this.authenticationUrl}/login`; 
    return this.http.post(url, {}, this.httpOptions);
  }

}