import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminCreateRequest, AdminUpdateRequest } from 'core/models/admin.model';
import { User } from 'core/models/user.model';
import { AdminService } from 'core/services/admin.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dialog',
  standalone: true,
  templateUrl: './admin-dialog.component.html',
  styleUrl: './admin-dialog.component.scss',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
})

export class AdminDialogComponent {

  form: FormGroup = new FormGroup({});
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private adminService: AdminService, private dialogRef: MatDialogRef<AdminDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group(this.adminService.getFormValidateNewAdmin(data));
  }

  ngOnInit(): void {
    this.getTypeAction();
  }

  onSubmit(): void {
    if (!this.isEditMode) this.save()
    else this.edit()
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private getTypeAction(): void {
    if (this.data) {
      this.isEditMode = true;

      this.form.patchValue({
        name: this.data.name,
        lastName: this.data.last_name,
        userName: this.data.user_name
      });

      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  private save(): void {

    const createData: AdminCreateRequest = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      userName: this.form.value.userName,
      password: this.form.value.password
    };

    this.adminService.createAdmin(createData).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error creating admin:', err)
    });
  }

  private edit(): void {

    const updateData: AdminUpdateRequest = {
      id: this.data.id,
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      userName: this.form.value.userName,
      password: ''
    };

    this.adminService.updateAdmin(this.data.id, updateData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error updating admin:', err);
      }
    });
  }
}
