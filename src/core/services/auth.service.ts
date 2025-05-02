import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { SignIn } from 'core/models/auth.model';
import { User } from 'core/models/user.model';
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

  sigUp(data: SignIn) {
    return this.httpClient.post<any>(`${this.apiUrl}/api/auth/signin`, data);
  }

}
