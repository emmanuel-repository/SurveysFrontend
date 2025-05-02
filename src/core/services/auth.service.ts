import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { SignIn, SignUp } from 'core/models/auth.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getDataValidateLogin() {
    return {
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    }
  }

  getDataValidateSignUp() {
    return {
      name: ['', [Validators.required]],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    }
  }

  signIn(data: SignIn) {
    return this.httpClient.post<any>(`${this.apiUrl}/api/auth/signin`, data);
  }

  signUp(data: SignUp) {
    return this.httpClient.post<any>(`${this.apiUrl}/api/auth/signUp`, data);
  }

}
