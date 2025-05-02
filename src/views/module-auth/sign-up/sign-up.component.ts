import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyErrorStateMatcher } from 'core/helpers/my-error-state-matcher';
import { AuthService } from 'core/services/auth.service';
import { Router } from '@angular/router';
import { SignUp } from 'core/models/auth.model';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
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

export class SignUpComponent {

  form: FormGroup = new FormGroup({});
  submitted: boolean = false;
  matcher: any = new MyErrorStateMatcher;
  router = inject(Router);
  showPanel: boolean = true;
  message: string = "";

  constructor(private _formBuild: FormBuilder, private _authService: AuthService) { }

  ngOnInit(): void {
    this.form = this._formBuild.group(this._authService.getDataValidateSignUp())
  }

  signUp(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    const formData: SignUp = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      userName: this.form.value.userName,
      password: this.form.value.password
    }

    this._authService.signUp(formData).subscribe({
      next: response => {
        this.showPanel = true
        this.message = "Se creo su Usuario";
      },
      error: error => {
        console.log("NO se pudo inciar sesion", error)
        this.showPanel = true;
        this.message = error;
      }
    })

  }

}
