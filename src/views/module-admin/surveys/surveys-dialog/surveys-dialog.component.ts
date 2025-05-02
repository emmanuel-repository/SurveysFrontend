import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Survey, SurveyCreateRequest } from 'core/models/survey.model';
import { SurveyService } from 'core/services/survey.service';



import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-surveys-dialog',
  standalone: true,
  templateUrl: './surveys-dialog.component.html',
  styleUrl: './surveys-dialog.component.scss',
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

export class SurveysDialogComponent {

  form: FormGroup = new FormGroup({});
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private surveyService: SurveyService, private dialogRef: MatDialogRef<SurveysDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Survey) {
    this.form = this.fb.group(surveyService.getFormValidateSurveys());
  }

  ngOnInit(): void {
    this.getTypeAction();
  }

  onSubmit(): void {
    if (!this.form.valid) return;

    if (!this.isEditMode) this.save();
    else this.edit();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private save(): void {
    const createData: SurveyCreateRequest = {
      name: this.form.value.name,
      description: this.form.value.description,
      date_register: new Date().toISOString()
    };

    this.surveyService.createSurvey(createData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error creating survey:', err);
      }
    });
  }

  private edit(): void {
    const updateData: Survey = {
      id: this.data.id,
      name: this.form.value.name,
      description: this.form.value.description,
      date_register: ""
    };

    this.surveyService.updateSurvey(this.data.id, updateData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error updating survey:', err);
      }
    });
  }

  private getTypeAction(): void {
    if (this.data) {
      this.isEditMode = true;

      this.form.patchValue({
        name: this.data.name,
        description: this.data.description
      });
    }
  }

}
