import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyErrorStateMatcher } from 'core/helpers/my-error-state-matcher';
import { AuthService } from 'core/services/auth.service';
import { SignIn } from 'core/models/auth.model';
import { Router } from '@angular/router';
import { JwtService } from 'core/services/jwt.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule
  ],
})

export class SignInComponent {

  form: FormGroup = new FormGroup({});
  submitted: boolean = false;
  matcher: any = new MyErrorStateMatcher;
  router = inject(Router);
  isValidetSession: boolean = true;

  private jwtService = inject(JwtService);

  constructor(private _formBuild: FormBuilder, private _authService: AuthService ) {}

  ngOnInit(): void {
    this.form = this._formBuild.group(this._authService.getDataValidateLogin())
  }

  singIn(): void {

    this.submitted = true;

    if(this.form.invalid) return;

    const formData: SignIn = {
      userName: this.form.value.userName,
      password: this.form.value.password
    }

    this._authService.signIn(formData).subscribe({
      next: response => {
       this.jwtService.setToken(response.token);

       const userRole = this.jwtService.getUserRole();

       this.router.navigate([userRole == "ADMIN" ? '/admin/config-admins' : '/user/answered-list'])
      },
      error: error => {
        console.log("NO se pudo inciar sesion", error)
        this.isValidetSession = false;
      }
    })
  }

  redirect(): void {
    console.log('sadkfadsjflksj')
    this.router.navigate(['/sign-up'])
  }

}
