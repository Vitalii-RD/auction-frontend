import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import User from 'src/types/User';
import { UserService } from '../app.service';
import { AuthenticationService } from './authentication-page.service';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.scss']
})
export class AuthenticationPageComponent implements OnInit {
  error:string = "";

  defaultLogin = {
    name: ['', Validators.required],
    password: ['', Validators.required]
  }

  loginForm = this.formBuilder.group(this.defaultLogin);

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  login():void {
    this.authenticationService.login(this.loginForm.value).subscribe(
      (user:User) => {
        this.router.navigate(['/auctions'])
        this.userService.emitUser(user);
      },
      (e:HttpErrorResponse) => {
        this.loginForm.reset();
        this.error = "Something went wrong. Probably user does not exist"
      }
    );
  }
}
