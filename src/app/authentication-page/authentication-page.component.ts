import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './authentication-page.service';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss']
})
export class AuthenticationPageComponent implements OnInit {

  defaultLogin = {
    name: '',
    password: ''
  }

  loginForm = this.formBuilder.group(this.defaultLogin);

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {

  }

  login():void {
    this.authenticationService.login().subscribe(() => {
      console.log(this.cookieService.getAll());
    });
  }
}
